# 🚀 Configuración Simple de Lista de Espera

## ✨ **Lo que hace ahora:**
- ✅ **Solo guarda emails** en tu base de datos
- ✅ **Sin autenticación** ni contraseñas
- ✅ **Sin RLS complejo** - solo políticas simples
- ✅ **Contador dinámico** de spots disponibles

## 🔧 **Pasos para configurar:**

### **1. Crear la tabla en Supabase:**
Ve a tu proyecto de Supabase → SQL Editor y ejecuta:

```sql
-- Crear tabla simple para emails
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Políticas simples
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow email insertion" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow stats reading" ON waitlist FOR SELECT USING (true);
```

### **2. Configurar variables de entorno:**
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### **3. Instalar Supabase:**
```bash
npm install @supabase/supabase-js
```

## 🎯 **Cómo funciona:**

1. **Usuario ingresa email** → Validación frontend
2. **Se verifica que no exista** → Evita duplicados
3. **Se guarda en la tabla** → Con timestamp y status
4. **Se actualiza el contador** → Spots disponibles
5. **Usuario ve confirmación** → Sin credenciales

## 📊 **Estructura de la tabla:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | ID único automático |
| `email` | TEXT | Email del usuario (único) |
| `created_at` | TIMESTAMP | Fecha de registro |
| `status` | TEXT | Estado: pending/approved/rejected |

## 🔍 **Para obtener credenciales:**

1. Ve a tu proyecto en [supabase.com](https://supabase.com)
2. Settings → API
3. Copia:
   - **Project URL**
   - **anon/public key**

## ✅ **¡Listo!**

Después de estos pasos, tu aplicación:
- Guardará emails en la base de datos
- Mostrará un contador dinámico
- No tendrá errores de RLS
- Será súper simple y funcional

¿Necesitas ayuda con algún paso específico?
