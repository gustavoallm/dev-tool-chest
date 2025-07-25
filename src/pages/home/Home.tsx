export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center rounded-md">
      <h1 className="text-4xl font-bold mb-4 text-primary">Dev Tool Chest</h1>
      <p className="text-lg text-muted-foreground max-w-xl mb-6">
        Welcome to <span className="font-semibold text-primary">Dev Tool Chest</span>!<br />
        This is your productivity hub for developers, bringing together several essential tools in one place,
        with a microfrontend architecture for maximum flexibility and scalability.
      </p>
      <ul className="text-left mx-auto max-w-md list-disc list-inside text-primary">
        <li>Quickly view and edit Markdown</li>
        <li>Parse and analyze JSON</li>
        <li>Compare files with the diff viewer</li>
        <li>Easily add new tools</li>
      </ul>
      <p className="mt-8 text-sm text-muted-foreground">Select a tool from the sidebar to get started.</p>
    </div>
  );
}
