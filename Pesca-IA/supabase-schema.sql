  -- Esquema de base de datos para PescaIA en Supabase
  -- Ejecuta este SQL en el SQL Editor de Supabase

  -- Habilitar extensiones necesarias
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- Tabla de usuarios en lista de espera
  CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_waitlist BOOLEAN DEFAULT true,
    waitlist_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    
    -- Campos adicionales para el futuro
    name TEXT,
    phone TEXT,
    preferences JSONB DEFAULT '{}',
    subscription_plan TEXT DEFAULT 'waitlist',
    subscription_start TIMESTAMP WITH TIME ZONE,
    subscription_end TIMESTAMP WITH TIME ZONE,
    
    -- Campos de tracking
    referred_by UUID REFERENCES waitlist(id),
    referral_count INTEGER DEFAULT 0,
    
    -- Timestamps de auditoría
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Índices para mejorar el rendimiento
  CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
  CREATE INDEX IF NOT EXISTS idx_waitlist_user_id ON waitlist(user_id);
  CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
  CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

  -- Función para actualizar updated_at automáticamente
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ language 'plpgsql';

  -- Trigger para actualizar updated_at
  CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

  -- Políticas de seguridad RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Usuarios pueden leer solo sus propios datos
CREATE POLICY "Users can view own waitlist data" ON waitlist
  FOR SELECT USING (auth.uid() = user_id);

-- Permitir inserción inicial (necesario para el registro)
CREATE POLICY "Allow initial waitlist insertion" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Usuarios pueden actualizar solo sus propios datos
CREATE POLICY "Users can update own waitlist data" ON waitlist
  FOR UPDATE USING (auth.uid() = user_id);

  -- Función para obtener estadísticas de la lista de espera
  CREATE OR REPLACE FUNCTION get_waitlist_stats()
  RETURNS TABLE(total_count BIGINT, available_spots BIGINT) AS $$
  BEGIN
    RETURN QUERY
    SELECT 
      COUNT(*)::BIGINT as total_count,
      GREATEST(0, 100 - COUNT(*))::BIGINT as available_spots
    FROM waitlist 
    WHERE status = 'pending';
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Función para verificar si un email ya existe
  CREATE OR REPLACE FUNCTION check_email_exists(check_email TEXT)
  RETURNS BOOLEAN AS $$
  BEGIN
    RETURN EXISTS(SELECT 1 FROM waitlist WHERE email = check_email);
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Vista para estadísticas públicas (sin RLS)
  CREATE OR REPLACE VIEW waitlist_stats AS
  SELECT 
    COUNT(*) as total_count,
    GREATEST(0, 100 - COUNT(*)) as available_spots,
    COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count
  FROM waitlist;

  -- Comentarios para documentar la estructura
  COMMENT ON TABLE waitlist IS 'Tabla principal para la lista de espera de PescaIA';
  COMMENT ON COLUMN waitlist.user_id IS 'ID del usuario en auth.users';
  COMMENT ON COLUMN waitlist.email IS 'Email del usuario (único)';
  COMMENT ON COLUMN waitlist.status IS 'Estado: pending, approved, rejected';
  COMMENT ON COLUMN waitlist.subscription_plan IS 'Plan de suscripción actual';
  COMMENT ON COLUMN waitlist.referred_by IS 'ID del usuario que lo refirió';
  COMMENT ON COLUMN waitlist.referral_count IS 'Número de usuarios referidos por este usuario';
