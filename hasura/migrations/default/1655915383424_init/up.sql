SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.channels (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    mode text DEFAULT 'PUBLIC'::text NOT NULL,
    members json DEFAULT json_build_array() NOT NULL,
    messsages json DEFAULT json_build_array() NOT NULL
);
CREATE TABLE public.profiles (
    id integer NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    avatar text NOT NULL,
    gems integer DEFAULT 0 NOT NULL,
    last_activity timestamp with time zone DEFAULT (now() AT TIME ZONE 'Europe/Rome'::text) NOT NULL
);
ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
