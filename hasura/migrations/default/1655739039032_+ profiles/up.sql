SET check_function_bodies = false;
CREATE TABLE public.profiles (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    avatar text NOT NULL
);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
