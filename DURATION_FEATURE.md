# Movie Duration Feature

## Overview
MandaStrong Studio includes a comprehensive movie duration control system that allows users to set their desired movie length from 0 to 180 minutes (3 hours).

## Key Features

### 1. **Interactive Slider (Page 11 - Editor Suite)**
- **Range**: 0 - 180 minutes
- **Smooth Control**: High-precision slider with large, easy-to-use interface
- **Large Display**: 9XL font showing current duration in minutes
- **Dynamic Labels**: Contextual descriptions based on duration:
  - 0 min: "Set your movie length"
  - 1-5 min: "Quick clip"
  - 6-15 min: "Short video"
  - 16-60 min: "Standard movie"
  - 61-120 min: "Feature length"
  - 121-180 min: "Epic production"

### 2. **Quick Preset Buttons**
Six convenient preset options for common movie lengths:
- **5 minutes** - Quick social media content
- **15 minutes** - Short documentary/tutorial
- **30 minutes** - TV episode length
- **60 minutes** - Standard movie (1 hour)
- **90 minutes** - Feature film standard
- **120 minutes** - Extended feature (2 hours)

### 3. **Additional Controls**
- **RESET Button**: Instantly set duration to 0
- **MAX Button**: Set to maximum 3 hours (180 minutes)
- **Active Highlighting**: Selected preset buttons scale up and highlight

### 4. **Duration Display Throughout App**
The duration is visible in multiple locations:
- **Top-right badge** (pages 11+): Always-visible duration indicator
- **Preview page** (page 15): Prominent duration display
- **Export page** (page 16): Duration shown in export settings
- **Rendering overlay**: Duration mentioned during render process

### 5. **Visual Design**
- **Gradient Background**: Purple gradient box (#7c3aed to #6d28d9)
- **Animated Clock Icon**: Pulsing clock icon for attention
- **Progress Indicators**: Visual markers at 0, 90, and 180 minutes
- **Hover Effects**: Buttons scale and highlight on hover
- **Large Touch Targets**: Mobile-friendly button sizes

## Technical Specifications

### Range Details
- **Minimum**: 0 minutes (no limit, flexible for planning)
- **Maximum**: 180 minutes (3 hours)
- **Step**: 1 minute increments
- **Default**: 90 minutes (1.5 hours)

### State Management
- Duration stored in React state
- Persists across page navigation
- Updates in real-time as user adjusts slider
- Integrated with rendering and export systems

### Integration Points
1. **Editor Suite** (Page 11): Primary duration setting interface
2. **Preview** (Page 15): Duration displayed during video preview
3. **Export** (Page 16): Duration included in export metadata
4. **Rendering**: Duration used to calculate render progress
5. **Top Navigation**: Persistent duration badge when on editor pages

## User Experience

### Setting Duration Workflow
1. Navigate to Editor Suite (Page 11)
2. See large, prominent duration slider
3. Choose method:
   - Drag slider to exact minute
   - Click quick preset button (5, 15, 30, 60, 90, 120)
   - Use RESET or MAX buttons
4. See instant visual feedback
5. Duration persists through entire workflow

### Visual Feedback
- **Slider changes in real-time** as user drags
- **Number updates immediately** (large 9XL display)
- **Context label updates** based on duration range
- **Selected preset highlights** with white background
- **Duration badge appears** in top-right corner

## Best Practices

### For Users
- Set duration early in workflow (on Editor Suite page)
- Use quick presets for standard lengths
- Fine-tune with slider for exact timing
- Check duration on preview before rendering

### For Content Types
- **Social Media**: 5-15 minutes
- **YouTube Videos**: 15-30 minutes
- **Documentaries**: 30-90 minutes
- **Feature Films**: 90-120 minutes
- **Epic Productions**: 120-180 minutes

## Mobile Responsiveness
- Large touch-friendly slider (6px height)
- Buttons sized for finger taps
- Number display readable on all screen sizes
- Responsive grid layout for presets

## Future Enhancements (Potential)
- Custom time input (hours:minutes format)
- Timeline length visualization
- Auto-calculate from added clips
- Save duration presets
- Duration warnings for export sizes

---

**Status**: ✅ Fully Functional
**Location**: Page 11 (Editor Suite)
**Range**: 0-180 minutes
**Default**: 90 minutes
