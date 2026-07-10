-- Create a table for projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  status text not null default 'draft',
  user_id uuid references auth.users not null
);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies
create policy "Users can view their own projects."
  on public.projects for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own projects."
  on public.projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own projects."
  on public.projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own projects."
  on public.projects for delete
  using ( auth.uid() = user_id );

-- Create a table for profiles (optional, but good for user data)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up triggers for new user creation
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
