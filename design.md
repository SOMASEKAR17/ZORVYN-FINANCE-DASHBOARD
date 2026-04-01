# Zorvyn Financial Dashboard: Design Specification

## 1. Visual Identity & Color Palette

### Base Colors
| Layer | Hex Code | Description |
| :--- | :--- | :--- |
| **Canvas** | `#08080A` | True dark background to make glass elements pop. |
| **Primary Accent** | `#8E76EF` | Electric Purple used for active states and CTA buttons. |
| **Glass Surface** | `#FFFFFF08` | 5% white opacity with high blur for the "glass" base. |
| **Text (Primary)** | `#FFFFFF` | Pure white for headers and main balances. |
| **Text (Secondary)** | `#9CA3AF` | Muted grey for descriptions and timestamps. |

### Semantic Colors
* **Income/Growth:** `#4ADE80` (Emerald Green)
* **Expenses:** `#FB7185` (Rose Red)

---

## 2. Component Specification: "Liquid Glass"

### Styling Properties
* **Backdrop Filter:** `blur(25px) saturate(160%)`
* **Border:** `1px solid rgba(255, 255, 255, 0.12)`
* **Box Shadow:** `0 8px 32px 0 rgba(0, 0, 0, 0.8)`
* **Internal Texture:** A subtle, animated SVG displacement map simulating slowly moving liquid caustics (refracted light through water).

### Interaction Logic
* **Hover State:** The `backdrop-filter` blur increases to `40px` and the border brightness increases by 20%.
* **Parallax:** Internal "liquid" highlights should shift slightly in the opposite direction of cursor movement to simulate 3D refraction.

