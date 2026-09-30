# Komova para Claude y OpenAI

![Símbolo de Komova](assets/komova-logo.svg)

**URL oficial del MCP remoto:** `https://api.komova.app/mcp`. Cada persona autoriza su propia cuenta de Komova mediante OAuth. Este repositorio no contiene credenciales ni concede acceso por sí solo. Una conexión al host anterior requiere volver a autorizar el recurso nuevo.

## Conexión directa para probar el flujo

| Cliente | Instalación | Comprobación |
| --- | --- | --- |
| Claude Chat en web o Desktop | **Customize → Connectors → Add custom connector**. Nombre: `Komova`. URL: `https://api.komova.app/mcp`. Pulsa **Connect** y completa OAuth con la misma cuenta que usarás en la app móvil. | Pide «Muéstrame mis proyectos de Komova» y verifica que aparece solo un Project propio. [Guía de Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp). |
| ChatGPT web, cuando la cuenta tiene acceso a apps MCP personalizadas | En **Settings → Apps → Create** o **Workspace settings → Apps → Create**, registra el endpoint `https://api.komova.app/mcp`, selecciona OAuth y ejecuta **Scan Tools**. La ruta y los permisos dependen del plan y del administrador del workspace. | Autoriza Komova y comprueba una lectura de un Project propio antes de probar escrituras. [Guía de OpenAI](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt). |

Se verificó una lectura autenticada del dueño con el conector de Claude y otra con la app personalizada de ChatGPT en el dominio nuevo. Escritura, renovación, revocación y una cuenta de tester externa aún requieren pruebas separadas. No pegues contraseñas, tokens móviles ni tokens de agente en un chat o configuración manual.

## Plugin de Claude desde este marketplace

En Claude Chat, abre **Customize → Plugins → Add → Add marketplace → Add from a repository**. Introduce `https://github.com/komova-app/marketplace`, agrega **komova** desde Discover y completa la conexión de Komova. El manifiesto del plugin apunta a `https://api.komova.app/mcp`. Confirma el Project propio después de instalarlo: importar el plugin no prueba que OAuth ni las herramientas funcionen en esa cuenta. [Instalar marketplaces en Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

Claude Code puede instalar el paquete con `/plugin marketplace add komova-app/marketplace` y `/plugin install komova@komova-marketplace`, pero **la conexión MCP por OAuth de Claude Code aún no está habilitada por el API de Komova**: usa un cliente y callback distintos del chat alojado. No se ofrece como recorrido de prueba del producto hasta resolver y verificar ese acceso. [Marketplace de Claude Code](https://code.claude.com/docs/en/plugin-marketplaces).

## Importar el catálogo en un workspace OpenAI

Un administrador puede usar **Workspace settings → Plugins → Add → Import marketplace**, con Source `https://github.com/komova-app/marketplace` y Path vacío. Después debe revisar los resultados, los permisos y el acceso al plugin. Importar el catálogo no conecta la cuenta Komova de cada miembro. Un plugin que declara `.mcp.json` puede quedar marcado **Desktop only** incluso con URL HTTPS remota; este catálogo no acredita uso en ChatGPT web. Para ese cliente, comprueba la app MCP directa descrita arriba. [Importación y límites de OpenAI](https://help.openai.com/en/articles/20001504-importing-and-syncing-plugin-marketplaces-from-github).

## Criterios antes de invitar a un tester

1. Confirmar que el cliente usa el endpoint exacto `https://api.komova.app/mcp`. Un conector personalizado de Claude puede mostrar una K genérica; ese ícono no demuestra que el host sea incorrecto. Si aparece la marca anterior, reconectar al endpoint nuevo y registrar cliente, versión y captura sin credenciales si persiste. Una ficha del directorio de Claude puede aportar la marca visual; este marketplace no tiene un campo de ícono documentado.
2. Autorizar con una cuenta de ensayo propia y comprobar una lectura de su Project sin mostrar datos de otra cuenta.
3. Crear un Item ficticio solo tras aprobar la escritura solicitada por el cliente y comprobar en Komova su título, Project y responsable. Al diagnosticar un duplicado, comparar los UUID desde el cliente o API antes de atribuirlo a la interfaz.
4. Verificar por separado renovación y revocación de la conexión. Una instalación del plugin, una lectura del dueño o una captura de simulador no sustituye el recorrido real del tester.

Las capturas de una app en simulador con datos de ejemplo no demuestran OAuth alojado ni instalación externa.
