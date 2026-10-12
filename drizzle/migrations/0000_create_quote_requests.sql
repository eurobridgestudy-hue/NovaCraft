CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  contact_name TEXT NOT NULL CHECK (char_length(contact_name) BETWEEN 2 AND 100),
  business_name TEXT NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 120),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  services TEXT[] NOT NULL CHECK (cardinality(services) BETWEEN 1 AND 3),
  business_context TEXT NOT NULL CHECK (char_length(business_context) BETWEEN 10 AND 1000),
  project_details TEXT NOT NULL CHECK (char_length(project_details) BETWEEN 20 AND 3000),
  consent BOOLEAN NOT NULL CHECK (consent = true),
  source TEXT NOT NULL DEFAULT 'website' CHECK (source = 'website')
);
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX quote_requests_created_at_idx ON public.quote_requests (created_at DESC);