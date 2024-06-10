// app/components/DataDisplay.tsx
interface DataDisplayProps {
  data: any;
}

export default function DataDisplay({ data }: DataDisplayProps) {

  return (
    <div>
      <h1>Data Display</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

