# Markdown Live Editor

A modern, responsive web-based Markdown editor with live preview, built with Next.js and React. Write Markdown in real-time and see instant HTML preview alongside your text.

## Features

- **Live Markdown Editing**: Write Markdown and see instant HTML preview
- **Rich Toolbar**: Formatting buttons for bold, italic, headings, lists, code blocks, links, images, and tables
- **Split View**: Side-by-side editor and preview on desktop for optimal workflow
- **Mobile Toggle**: Switch between editor and preview modes on mobile devices
- **Syntax Highlighting**: Code blocks with syntax highlighting support
- **Metrics Bar**: Real-time statistics including word count, character count, line count, and cursor position
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Undo/Redo**: Full history management for your edits

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Markdown Processing**: ReactMarkdown with remark-gfm
- **Icons**: Phosphor Icons
- **Build Tool**: Turbopack

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd markdown-editor
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

### Using the Toolbar

The toolbar above the editor provides quick formatting buttons:

- **Bold/Italic**: Select text and click the button, or click to insert at cursor
- **Headings**: Click to insert H2 heading (or modify for other levels)
- **Lists**: Create unordered or ordered lists
- **Code**: Insert inline code or code blocks
- **Links/Images**: Insert with placeholder text/URLs
- **Tables**: Generate a basic table structure
- **Undo/Redo**: Navigate through edit history

### Switching Views

- **Desktop**: Editor and preview are always visible side-by-side
- **Mobile**: Use the toggle buttons in the header of each panel to switch between editor and preview modes

### Metrics

The bottom bar shows real-time statistics:
- Markdown: bytes, words, lines, cursor position (Ln, Col)
- HTML: characters, words, paragraphs

## Project Structure

```

markdown-editor/
├── src/
│ ├── app/
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── components/
│ │ ├── Editor.tsx
│ │ ├── EditorControls.tsx
│ │ ├── MetricsBar.tsx
│ │ ├── Navbar.tsx
│ │ └── Preview.tsx
│ ├── hooks/
│ │ ├── useEditorState.ts
│ │ ├── useFileDownload.ts
│ │ ├── useHistory.ts
│ │ └── useScrollSync.ts
│ └── utils/
│ └── EditorUtils.ts
├── public/
├── package.json
├── tailwind.config.js
├── next.config.ts
└── README.md

```

## Future Improvements

- **Auto-save**: Automatic saving to local storage or cloud
- **Export Options**: PDF, HTML, or other formats
- **Collaboration**: Real-time multi-user editing
- **Keyboard Shortcuts**: Common Markdown shortcuts (Ctrl+B for bold, etc.)
- **Themes**: Dark/light mode and custom color schemes
- **File Management**: Open/save local files
- **Extensions**: Plugin system for additional features

---

```
Built with ❤️ using Next.js and React. Contributions welcome!
```
