
interface TableProps {
    columns: string[];
    data: Record<string, string | number>[];
    striped?: boolean;
  }
  
  export default function Table({
    columns,
    data,
    striped = false,
  }: TableProps) {
    return (
      <div className="table-wrapper">
        <table className={striped ? "data-table striped" : "data-table"}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
  
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column}>
                    {row[column] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
  
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length}>No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  