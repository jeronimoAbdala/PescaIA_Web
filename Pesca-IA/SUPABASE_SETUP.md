# Configuración de Supabase para PescaIA

## 🚀 Pasos para configurar Supabase

### 1. Crear proyecto en Supabase
1. Ve a [Supabase](https://supabase.com/)
2. Haz clic en "Start your project"
3. Conecta tu cuenta de GitHub o crea una nueva
4. Haz clic en "New Project"
5. Selecciona tu organización
6. Nombra tu proyecto (ej: "pescaia-web")
7. Establece una contraseña para la base de datos
8. Elige la región más cercana a tus usuarios
9. Haz clic en "Create new project"

### 2. Configurar Authentication
1. En el panel izquierdo, ve a "Authentication"
2. En "Settings" → "General", configura:
   - Site URL: `http://localhost:5173` (desarrollo)
   - Redirect URLs: `http://localhost:5173/auth/callback`
3. En "Providers" → "Email", asegúrate de que esté habilitado
4. Opcional: Configura templates de email personalizados

### 3. Crear la base de datos
1. En el panel izquierdo, ve a "SQL Editor"
2. Copia y pega el contenido de `supabase-schema.sql`
3. Haz clic en "Run" para ejecutar el script
4. Verifica que se hayan creado las tablas en "Table Editor"

### 4. Obtener credenciales de configuración
1. En el panel izquierdo, ve a "Settings" → "API"
2. Copia:
   - Project URL
   - anon/public key

### 5. Configurar variables de entorno
1. Copia el archivo `supabase.env.example` como `.env.local`
2. Reemplaza los valores con tu configuración real:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 6. Instalar dependencias de Supabase
```bash
npm install @supabase/supabase-js
```

## 📱 Funcionalidades implementadas

### ✅ Creación de usuarios
- Validación de email
- Creación en Supabase Auth con contraseña "Abc123"
- Almacenamiento en tabla `waitlist` con metadatos
- Manejo de errores específicos de Supabase

### ✅ Gestión de estado
- Hook personalizado `useAuth` para manejar autenticación
- Estado persistente del usuario
- Manejo de loading y errores
- Estadísticas dinámicas de la lista de espera

### ✅ Base de datos PostgreSQL
- Tabla `waitlist` con estructura optimizada
- Políticas de seguridad RLS (Row Level Security)
- Índices para mejor rendimiento
- Funciones SQL para estadísticas

## 🚀 Cómo funciona

1. **Usuario ingresa email** → Se valida formato
2. **Se crea cuenta en Supabase Auth** → Con contraseña "Abc123"
3. **Se guarda en tabla `waitlist`** → Con metadatos adicionales
4. **Usuario recibe confirmación** → Con credenciales de acceso
5. **Estadísticas se actualizan** → En tiempo real

## 🔒 Seguridad

- **RLS (Row Level Security)** habilitado
- Usuarios solo pueden acceder a sus propios datos
- Contraseña fija "Abc123" (configurable)
- Validación de email en frontend y backend
- Manejo seguro de errores

## 📊 Estructura de la base de datos

### Tabla `waitlist`:
- `id`: UUID único
- `user_id`: Referencia a auth.users
- `email`: Email del usuario (único)
- `created_at`: Fecha de creación
- `is_waitlist`: Boolean para estado
- `status`: pending/approved/rejected
- `subscription_plan`: Plan actual
- `referred_by`: Sistema de referidos
- `preferences`: JSON para preferencias

## 🔧 Configuración avanzada

### Políticas RLS:
```sql
-- Usuarios pueden leer solo sus propios datos
CREATE POLICY "Users can view own waitlist data" ON waitlist
  FOR SELECT USING (auth.uid() = user_id);
```

### Funciones SQL:
```sql
-- Estadísticas de la lista de espera
SELECT * FROM get_waitlist_stats();
```

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto

### Error: "Email already registered"
- El usuario ya existe en Supabase Auth
- Considera implementar un flujo de "olvidé mi contraseña"

### Error: "Table doesn't exist"
- Ejecuta el script SQL en el SQL Editor de Supabase
- Verifica que las tablas se hayan creado correctamente

## 🔄 Próximos pasos

1. **Configurar templates de email** personalizados
2. **Implementar sistema de referidos** completo
3. **Añadir analytics** y tracking de conversiones
4. **Configurar webhooks** para notificaciones
5. **Implementar dashboard** de administración

## 🌟 Ventajas de Supabase vs Firebase

- **Open Source**: Código abierto y transparente
- **PostgreSQL**: Base de datos relacional robusta
- **RLS**: Seguridad a nivel de fila nativa
- **Funciones SQL**: Lógica de negocio en la base de datos
- **Precio**: Más económico para proyectos pequeños
- **Control**: Mayor control sobre la infraestructura
