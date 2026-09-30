# Komova para Claude y OpenAI

![Símbolo de Komova](assets/komova-logo.svg)

**URL oficial del MCP remoto:** `https://api.komova.app/mcp`. Cada persona autoriza su propia cuenta de Komova mediante OAuth. Este repositorio no contiene credenciales ni concede acceso por sí solo. Una conexión al host anterior requiere volver a autorizar el recurso nuevo.

## Conexión directa para probar el flujo

| Cliente | Instalación | Comprobación |
| --- | --- | --- |
| Claude Chat en web o Desktop | En Pro/Max: **Customize → Connectors → + → Add custom connector**. Nombre: `Komova`. URL: `https://api.komova.app/mcp`. En Team/Enterprise, primero un Owner agrega la URL en **Organization settings → Connectors → Add → Custom → Web**; después cada miembro pulsa **Connect** en **Customize → Connectors** y completa OAuth con su cuenta de Komova. | Pide «Muéstrame mis proyectos de Komova» y verifica que aparece solo un Project propio. [Guía de Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp). |
| ChatGPT web, cuando la cuenta tiene acceso a apps MCP personalizadas | Con developer mode habilitado, en **Settings → Apps → Create** o **Workspace settings → Apps → Create**, registra `https://api.komova.app/mcp`, selecciona OAuth, ejecuta **Scan Tools**, completa la autorización y espera a que termine el escaneo antes de crear la app. La ruta y los permisos dependen del plan y del administrador del workspace. | Comprueba una lectura de un Project propio antes de probar escrituras. [Guía de OpenAI](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt). |

Se verificaron lecturas autenticadas y una escritura controlada (`mark_agent_working` sobre un Item ya activo) desde el conector de Claude y la app personalizada de ChatGPT en el dominio nuevo. Ambas conexiones siguieron funcionando varias horas después de la autorización sin iniciar sesión otra vez; esto respalda la continuidad de la sesión, pero no prueba por separado el intercambio del refresh token. La revocación y una cuenta de tester externa aún requieren pruebas separadas. No pegues contraseñas, tokens móviles ni tokens de agente en un chat o configuración manual.

## Plugin de Claude desde este marketplace

En Claude Chat, abre **Customize → Plugins → Add → Add marketplace → Add from a repository**. Introduce `https://github.com/komova-app/marketplace`, agrega **komova** desde Discover y completa la conexión de Komova. El manifiesto del plugin apunta a `https://api.komova.app/mcp`. Confirma el Project propio después de instalarlo: importar el plugin no prueba que OAuth ni las herramientas funcionen en esa cuenta. [Instalar marketplaces en Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

Claude Code puede instalar el paquete con `/plugin marketplace add komova-app/marketplace` y `/plugin install komova@komova-marketplace`, pero **la conexión MCP por OAuth de Claude Code aún no está habilitada por el API de Komova**: usa un cliente y callback distintos del chat alojado. No se ofrece como recorrido de prueba del producto hasta resolver y verificar ese acceso. [Marketplace de Claude Code](https://code.claude.com/docs/en/plugin-marketplaces).

## Importar el catálogo en un workspace OpenAI

Un administrador puede usar **Workspace settings → Plugins → Add → Import marketplace**, con Source `https://github.com/komova-app/marketplace` y Path vacío. Después debe revisar los resultados, los permisos y el acceso al plugin. Importar el catálogo no conecta la cuenta Komova de cada miembro. Un plugin que declara `.mcp.json` puede quedar marcado **Desktop only** incluso con URL HTTPS remota; este catálogo no acredita uso en ChatGPT web. Para ese cliente, comprueba la app MCP directa descrita arriba. [Importación y límites de OpenAI](https://help.openai.com/en/articles/20001504-importing-and-syncing-plugin-marketplaces-from-github).

El plugin importado desde GitHub y la app MCP de ChatGPT son registros distintos. Para actualizar el plugin importado, abre **Workspace settings → Plugins → Marketplaces → Komova → Sync now** y revisa el informe; la sincronización no crea, conecta ni actualiza la app MCP. Si la app de ChatGPT muestra herramientas antiguas, revisa sus acciones desde **Workspace settings → Apps**: en Enterprise/Edu un administrador puede usar **Action control → Refresh**; en Business, una app ya publicada debe recrearse y publicarse de nuevo para cambiar sus herramientas o metadatos. Comprueba después la conexión y los permisos de escritura de la app efectiva. [Sincronización del marketplace](https://help.openai.com/en/articles/20001504-importing-and-syncing-plugin-marketplaces-from-github), [actualización de apps MCP](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).

## Criterios antes de invitar a un tester

1. Confirmar que el cliente usa el endpoint exacto `https://api.komova.app/mcp`. Un conector personalizado de Claude puede mostrar una K genérica; ese ícono no demuestra que el host sea incorrecto. Si aparece la marca anterior, reconectar al endpoint nuevo y registrar cliente, versión y captura sin credenciales si persiste. Una ficha del directorio de Claude puede aportar la marca visual; este marketplace no tiene un campo de ícono documentado.
2. Autorizar con una cuenta de ensayo propia y comprobar una lectura de su Project sin mostrar datos de otra cuenta.
3. Crear un Item ficticio solo tras aprobar la escritura solicitada por el cliente y comprobar en Komova su título, Project y responsable. Al diagnosticar un duplicado, comparar los UUID desde el cliente o API antes de atribuirlo a la interfaz.
4. Verificar por separado renovación y revocación de la conexión. Una instalación del plugin, una lectura del dueño o una captura de simulador no sustituye el recorrido real del tester.

Las capturas de una app en simulador con datos de ejemplo no demuestran OAuth alojado ni instalación externa.
