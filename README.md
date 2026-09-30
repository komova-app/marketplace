# Komova para Claude y ChatGPT

![Símbolo de Komova](assets/komova-logo.svg)

Komova muestra en el teléfono el trabajo que una persona y sus agentes llevan en común. Un **Project** reúne un objetivo; un **Item** deja clara la próxima acción, su responsable y sus requisitos. Los Forms piden respuestas concretas al titular. Las Entries y los Reminders aparecen en Feed para contar resultados o señalar algo que requiere atención.

**MCP remoto oficial:** `https://api.komova.app/mcp`. Cada persona conecta su propia cuenta mediante OAuth. El paquete no contiene credenciales ni da acceso a los datos por sí solo.

## Primer recorrido

1. Conecta el MCP por una de las rutas siguientes y autoriza tu propia cuenta de Komova. Si tenías una conexión al host anterior, vuelve a autorizar el recurso nuevo.
2. Pide «Muéstrame mis Projects de Komova» y abre uno por su UUID. Debe aparecer un Project propio; el título no es un identificador único.
3. Cuando quieras probar una escritura, pide un Item pequeño en ese Project, revisa la acción que el cliente propone y apruébala. Comprueba en la app el UUID, el título, el Project y el responsable del Item. Una respuesta del chat sin el Item en Komova no confirma la escritura.

| Cliente | Cómo conectar |
| --- | --- |
| Claude Chat web o Desktop | En Pro/Max: **Customize → Connectors → + → Add custom connector**. Nombre `Komova`, URL `https://api.komova.app/mcp`; pulsa **Connect** y completa OAuth. En Team/Enterprise, un Owner agrega primero la URL en **Organization settings → Connectors → Add → Custom → Web** y cada miembro conecta su propia cuenta. [Guía de Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp). |
| ChatGPT web con apps MCP personalizadas habilitadas | Con developer mode, usa **Settings → Apps → Create** o **Workspace settings → Apps → Create**, registra `https://api.komova.app/mcp`, selecciona OAuth y ejecuta **Scan Tools**. La ruta y los permisos dependen del plan y del workspace. [Guía de OpenAI](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt). |

## Qué herramienta usar

| Necesidad | Herramientas principales | Dónde se ve |
| --- | --- | --- |
| Encontrar un objetivo y su trabajo | `list_projects`, `get_project`, `list_project_items`, `get_item` | Projects y List; el detalle del Item muestra responsable, requisitos y Forms. |
| Registrar una acción aprobada | `add_item`, `change_item`, `set_item_dependencies` | List y Project. La espera por un requisito se calcula sin sustituir el estado real del Item. |
| Pedir una respuesta estructurada | `request_information`, `request_human_action`, `get_information_request` | Form del Item humano; una respuesta guardada en borrador local todavía no llega al agente. |
| Contar un avance duradero | `add_report`, `change_report`, `get_report` | Entry en Feed y su detalle completo; las fuentes HTTPS van separadas del relato. |
| Señalar algo breve ahora | `add_reminder`, `get_reminder` | Tarjeta inmediata en Feed que abre un Project, Item o Entry exacto. No es un programador. |
| Atender una observación del titular | `list_feedback`, `get_feedback`, `acknowledge_feedback`, `resolve_feedback` | Feedback ligado al Project, Item o Entry; leerlo no equivale a resolverlo. |

La [skill Komova](plugins/komova/skills/komova-work/SKILL.md) contiene el [modelo de la app](plugins/komova/skills/komova-work/references/app-model.md), la [referencia de las 37 herramientas](plugins/komova/skills/komova-work/references/tools.md) con parámetros y validaciones, y la [guía para escribir en Feed](plugins/komova/skills/komova-work/references/feed.md). El servidor también publica guías vivas mediante `get_komova_guide`; consúltalas cuando una firma o un comportamiento haya cambiado.

## Instalar el plugin desde este marketplace

En Claude Chat, abre **Customize → Plugins → Add → Add marketplace → Add from a repository**. Introduce `https://github.com/komova-app/marketplace`, agrega **komova** desde Discover y completa la conexión. El manifiesto apunta al MCP remoto oficial. La instalación del plugin y la autorización OAuth son pasos distintos. [Instalar marketplaces en Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

Claude Code puede instalar el paquete con `/plugin marketplace add komova-app/marketplace` y `/plugin install komova@komova-marketplace`. Su cliente y callback OAuth son distintos de Claude Chat y aún no están habilitados en el API de Komova; no uses esa ruta como prueba de conexión hasta que se verifique. [Marketplace de Claude Code](https://code.claude.com/docs/en/plugin-marketplaces).

En un workspace OpenAI, un administrador puede importar este repositorio desde **Workspace settings → Plugins → Add → Import marketplace** y sincronizarlo después desde **Plugins → Marketplaces → Komova → Sync now**. Ese plugin de GitHub y una app MCP personalizada de ChatGPT son registros distintos: importar o sincronizar el primero no crea ni actualiza la segunda. Un plugin con `.mcp.json` puede figurar como **Desktop only**; para ChatGPT web usa la app MCP directa de arriba. [Importación de marketplaces](https://help.openai.com/en/articles/20001504-importing-and-syncing-plugin-marketplaces-from-github).

Si una app de ChatGPT conserva herramientas antiguas, revisa sus acciones en la administración de Apps: Enterprise/Edu ofrece **Action control → Refresh**; en Business puede requerirse recrear y publicar de nuevo una app ya publicada. Confirma después el catálogo y los permisos efectivos. [Actualización de apps MCP](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).

Se comprobaron lecturas y una escritura controlada sobre un Item ya activo desde Claude Chat y ChatGPT conectados a `api.komova.app`. Ambas conexiones siguieron funcionando horas después de autorizar sin repetir el login; el intercambio del refresh token y la revocación requieren pruebas separadas. Nunca pegues contraseñas, tokens ni códigos OAuth en un chat o Form.
