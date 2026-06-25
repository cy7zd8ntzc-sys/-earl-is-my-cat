-- Earl Is My Cat production starter schema
-- PostgreSQL / RDS-compatible conceptual schema.
-- This is not a complete migration; it is a starting data model for engineering review.

create extension if not exists pgcrypto;

-- ENUMS
create type user_role as enum ('patient', 'provider', 'admin', 'support', 'auditor', 'system');
create type visit_status as enum (
  'draft',
  'age_blocked',
  'intake_started',
  'photos_pending',
  'consent_pending',
  'payment_pending',
  'submitted',
  'triage_review',
  'provider_review',
  'needs_info',
  'rx_pending',
  'pharmacy_sent',
  'closed_rx',
  'closed_no_rx',
  'referred',
  'closed_referred',
  'refunded',
  'canceled'
);
create type photo_status as enum ('upload_pending', 'uploaded', 'processing', 'ready', 'rejected', 'deleted');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded', 'partial_refund', 'canceled');
create type rx_status as enum ('draft', 'signed', 'queued', 'sent', 'accepted', 'clarification', 'filled', 'shipped', 'canceled', 'failed');
create type handoff_method as enum ('e_rx', 'secure_portal', 'encrypted_api', 'secure_fax', 'manual_reference');

-- USERS / IDENTITY
create table app_users (
  id uuid primary key default gen_random_uuid(),
  role user_role not null,
  auth_subject text unique not null,
  email text,
  mfa_enabled boolean not null default false,
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id),
  legal_first_name text,
  legal_last_name text,
  date_of_birth date not null,
  email text not null,
  phone text,
  address_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) not null,
  display_name text not null,
  npi text,
  credentials text,
  license_json jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- VISITS
create table visits (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) not null,
  assigned_provider_id uuid references providers(id),
  status visit_status not null default 'draft',
  concern_slug text,
  patient_state text,
  severity text,
  duration text,
  chief_concern text,
  intake_snapshot jsonb not null default '{}'::jsonb,
  red_flag_summary jsonb not null default '[]'::jsonb,
  adult_attestation boolean not null default false,
  submitted_at timestamptz,
  closed_at timestamptz,
  closure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visits_patient_idx on visits(patient_id);
create index visits_status_idx on visits(status);
create index visits_assigned_provider_idx on visits(assigned_provider_id);

-- PHOTOS
create table visit_photos (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  photo_type text not null check (photo_type in ('overview','medium','closeup','other')),
  object_key_original text,
  object_key_display text,
  sha256 text,
  content_type text,
  size_bytes integer,
  status photo_status not null default 'upload_pending',
  rejection_reason text,
  uploaded_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visit_photos_visit_idx on visit_photos(visit_id);

-- CONSENTS
create table consents (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  patient_id uuid references patients(id) not null,
  consent_type text not null,
  version text not null,
  accepted boolean not null,
  accepted_at timestamptz not null default now(),
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb
);

create index consents_visit_idx on consents(visit_id);

-- PAYMENTS
create table payments (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer not null,
  currency text not null default 'usd',
  status payment_status not null default 'pending',
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payments_visit_idx on payments(visit_id);

-- PROVIDER DECISIONS
create table provider_decisions (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  provider_id uuid references providers(id) not null,
  diagnosis_text text,
  diagnosis_codes jsonb not null default '[]'::jsonb,
  plan_text text,
  rx_needed boolean not null default false,
  rx_summary text,
  safety_notes text,
  decision_status text not null default 'draft',
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index provider_decisions_visit_idx on provider_decisions(visit_id);

-- PRESCRIPTIONS
create table prescriptions (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  provider_decision_id uuid references provider_decisions(id),
  provider_id uuid references providers(id) not null,
  medication_name text not null,
  is_compounded boolean not null default false,
  formulation_text text,
  sig text not null,
  quantity text,
  refills integer not null default 0,
  substitution_allowed boolean not null default false,
  compounding_rationale text,
  status rx_status not null default 'draft',
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint compounded_requires_rationale check (
    (is_compounded = false) or (compounding_rationale is not null and length(compounding_rationale) > 0)
  )
);

create index prescriptions_visit_idx on prescriptions(visit_id);

-- PHARMACY
create table pharmacies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  ncpdp_id text,
  npi text,
  pharmacy_type text, -- 503A, 503B, retail, other
  licenses_json jsonb not null default '[]'::jsonb,
  supported_states text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table pharmacy_handoffs (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid references prescriptions(id) not null,
  pharmacy_id uuid references pharmacies(id) not null,
  handoff_method handoff_method not null,
  payload_hash text,
  status rx_status not null default 'queued',
  external_reference text,
  sent_at timestamptz,
  last_status_at timestamptz,
  status_history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pharmacy_handoffs_rx_idx on pharmacy_handoffs(prescription_id);

-- PATIENT MESSAGES
create table patient_messages (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) not null,
  sender_user_id uuid references app_users(id),
  sender_type text not null check (sender_type in ('provider','patient','system','admin')),
  visibility text not null default 'patient' check (visibility in ('patient','internal')),
  body text not null,
  sent_at timestamptz not null default now(),
  read_at timestamptz
);

create index patient_messages_visit_idx on patient_messages(visit_id);

-- AUDIT
create table audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references app_users(id),
  actor_role user_role,
  patient_id uuid references patients(id),
  visit_id uuid references visits(id),
  event_type text not null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text,
  occurred_at timestamptz not null default now()
);

create index audit_visit_idx on audit_events(visit_id);
create index audit_patient_idx on audit_events(patient_id);
create index audit_event_type_idx on audit_events(event_type);
create index audit_occurred_idx on audit_events(occurred_at);
