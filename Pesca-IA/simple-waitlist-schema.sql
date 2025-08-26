-- Esquema simple para la lista de espera de PescaIA
-- Ejecuta este SQL en el SQL Editor de Supabase

-- Crear tabla simple para emails
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Crear índice para ordenar por fecha
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Política simple: permitir inserción de emails
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Permitir inserción de emails (sin restricciones)
CREATE POLICY "Allow email insertion" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Permitir lectura de estadísticas (para el contador)
CREATE POLICY "Allow stats reading" ON waitlist
  FOR SELECT USING (true);

-- Comentarios
COMMENT ON TABLE waitlist IS 'Lista de espera simple para PescaIA';
COMMENT ON COLUMN waitlist.email IS 'Email del usuario';
COMMENT ON COLUMN waitlist.status IS 'Estado: pending, approved, rejected';
