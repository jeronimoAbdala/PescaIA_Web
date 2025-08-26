-- Corrección de políticas RLS para permitir inserción inicial
-- Ejecuta este SQL en el SQL Editor de Supabase

-- Eliminar la política restrictiva anterior
DROP POLICY IF EXISTS "Users can insert own waitlist data" ON waitlist;

-- Crear nueva política que permita inserción inicial
CREATE POLICY "Allow initial waitlist insertion" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Verificar que las políticas estén correctas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';
