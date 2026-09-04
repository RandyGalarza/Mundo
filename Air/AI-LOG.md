# Registro de Auditoría de IA (AI-LOG)

**Proyecto:** `Air`  
**Fecha de registro:** 2026-09-04  
**Tecnología:** Expo SDK 57, React Native 0.86, React 19, TypeScript y NativeWind 4  
**Aplicación de referencia:** Airbnb  
**Estado:** maqueta funcional de tres pantallas

## 1. Prompts utilizados

1. Error: react-native-css-interop/jsx-runtime no encontrado
Problema: Faltaba la dependencia de NativeWind

Solución: Instalamos nativewind, tailwindcss y configuramos babel.config.js y tailwind.config.js

2. Error: nativewind@4.0.0 no existe
Problema: Versión incorrecta

Solución: Usamos nativewind@2.0.11 o @latest

3. Error: .plugins is not a valid Plugin property
Problema: babel.config.js mal configurado

Solución: Corregimos a plugins: ['nativewind/babel']

4. Error: expo-router no encontrado
Problema: app.json tenía plugin de expo-router sin instalarlo

Solución: Eliminamos expo-router de app.json o instalamos si era necesario

5. La app se ve en la izquierda (web)
Problema: La app no está centrada en el navegador

### Acciones de validación solicitadas a la herramienta

- Instalar `nativewind` y `tailwindcss`.
- Instalar `babel-preset-expo` usando `npx expo install`.
- Ejecutar `npx tsc --noEmit`.
- Ejecutar `npx expo export --platform web`.
- Levantar Expo Web, abrir `http://localhost:8081`, inspeccionar la interfaz y probar la pestaña **Viajes**.
- Generar la captura de ejecución en `screenshot.png`.

## 2. Código generado vs. código modificado

### Código generado por IA

Se generó la maqueta y la configuración inicial:

- `App.tsx`:
  - Tipo `Screen` para las vistas `explore`, `trips` y `profile`.
  - Datos de ejemplo de alojamientos en `homes`.
  - Categorías `Todo`, `Playa`, `Cabañas` y `Ciudades`.
  - `ExploreScreen` con búsqueda, filtros, banner, alojamientos y favoritos.
  - `TripsScreen` con el viaje próximo a Oaxaca y alojamientos guardados.
  - `ProfileScreen` con avatar, valoración, reseñas y opciones de cuenta.
  - Navegación inferior controlada con `useState` y `Pressable`.
  - Uso de `SafeAreaView`, `ScrollView`, `TextInput`, `Image`, `Pressable`, `Text` y `View`.
  - Estilos mediante `className`; no se usa `StyleSheet.create()`.
- `babel.config.js`: presets de Expo y NativeWind.
- `metro.config.js`: integración de `withNativeWind` con Metro.
- `tailwind.config.js`: preset de NativeWind, rutas de contenido y `darkMode: 'class'`.
- `global.css`: directivas `@tailwind base`, `components` y `utilities`.
- `nativewind-env.d.ts`: referencia de tipos de NativeWind.
- `global.d.ts`: declaración de módulos CSS para TypeScript.
- `README.md`: explicación del diseño y enlace Markdown a la captura.
- `screenshot.png`: captura tomada desde la aplicación renderizada en Expo Web.

### Código existente conservado

- `index.ts` mantuvo el registro de la aplicación mediante `registerRootComponent(App)`.
- `app.json`, `tsconfig.json`, `LICENSE` y los recursos existentes de `assets/` no fueron reemplazados.

### Código modificado durante la implementación

- El `App.tsx`.
- `index.ts` se revisó para ubicar correctamente el import de `global.css` en el componente raíz (`App.tsx`), evitando cargarlo como import lateral desde el entrypoint.
- `babel.config.js` fue corregido durante la validación.
- `tailwind.config.js` incorporó `darkMode: 'class'` para evitar el conflicto del modo oscuro automático en web.
- `package.json` y `package-lock.json` fueron actualizados por npm al añadir `nativewind`, `tailwindcss` y `babel-preset-expo`.

### Datos y decisiones de diseño

- Se eligió Airbnb porque encaja con una aplicación comercial basada en exploración, tarjetas visuales, favoritos y viajes.
- Se usaron imágenes remotas de Unsplash mediante URLs `https://images.unsplash.com/...`.
- La paleta usa fondo marfil, carbón y coral para aproximar una experiencia de viajes cálida sin replicar activos propietarios.
- Los iconos se representaron con caracteres Unicode (`⌕`, `♡`, `♥`, `★`, `⌂`, `▣`, `○`, `›`) para evitar añadir una dependencia de iconos.
- La búsqueda actualiza el valor de `TextInput`; el botón **Buscar** es visual y todavía no filtra resultados.
- Los filtros actualizan el estado visual seleccionado; no filtran la lista porque son datos demostrativos.
- El botón de favorito sí cambia entre `♡` y `♥` por alojamiento.

## 3. Alucinaciones o errores detectados

### Errores encontrados y corregidos

1. **Import CSS no reconocido por TypeScript**
	- Mensaje: `Cannot find module or type declarations for side-effect import of './global.css'`.
	- Causa: faltaba una declaración de módulo CSS.
	- Corrección: se creó `global.d.ts` con `declare module '*.css';`.

2. **Preset Babel ausente**
	- Mensaje: `Cannot find module 'babel-preset-expo'`.
	- Causa: el starter no exponía el preset como dependencia resoluble para la configuración Babel creada.
	- Corrección: se instaló la versión compatible mediante `npx expo install babel-preset-expo`.

3. **NativeWind registrado en la sección incorrecta de Babel**
	- Mensaje: `.plugins is not a valid Plugin property`.
	- Causa: `nativewind/babel` había sido configurado como plugin.
	- Corrección: se movió a `presets` en `babel.config.js`.

4. **Caché de Metro con error 500**
	- Síntoma: el navegador recibía un bundle con estado 500 y MIME `application/json`.
	- Causa: el servidor conservaba el resultado fallido anterior.
	- Corrección: se reinició Expo con `--clear` en el puerto `8083`.

5. **Conflicto de modo oscuro en Expo Web**
	- Mensaje: `Cannot manually set color scheme, as dark mode is type 'media'`.
	- Corrección aplicada: `darkMode: 'class'` en `tailwind.config.js` y reinicio de Metro.

### Advertencias no bloqueantes

- npm mostró `10 moderate severity vulnerabilities` durante la instalación. No se ejecutó `npm audit fix --force` porque podría introducir cambios incompatibles y no era necesario para la maqueta.
- npm también mostró advertencias de dependencias peer relacionadas con `react-native-worklets`, `react-native-reanimated` y `expo-modules-core`. La aplicación compiló y arrancó pese a esas advertencias.

### Posibles limitaciones funcionales identificadas

- Las imágenes dependen de conexión a internet; no hay fallback local configurado.
- El botón **Buscar** no ejecuta filtrado de alojamientos todavía.
- Las categorías cambian el estado activo, pero no cambian el contenido mostrado.
- **Ver todo**, **Ver reserva** y las opciones del perfil son controles visuales sin navegación adicional.
- `screenshot.png` representa la vista principal de Explora, no las tres pantallas simultáneamente.

## Validación final

- `npx tsc --noEmit`: correcto, sin salida ni errores.
- `npx expo export --platform web`: correcto.
- Expo Web en `http://localhost:8081`: bundle correcto y aplicación renderizada.
- La inspección del navegador confirmó `TextInput`, imágenes, tarjetas, filtros y navegación inferior.
- La pestaña **Viajes** fue pulsada y mostró correctamente su contenido.
- `screenshot.png` existe en la raíz y está enlazada desde `README.md`.
