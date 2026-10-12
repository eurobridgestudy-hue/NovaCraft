ALTER TABLE public.quote_requests ADD COLUMN requester_hash TEXT;
COMMENT ON COLUMN public.quote_requests.requester_hash IS 'Server-generated one-way request fingerprint used only for abuse prevention';
CREATE INDEX quote_requests_requester_hash_created_at_idx ON public.quote_requests (requester_hash, created_at DESC);