import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ResponsiveContainer } from "recharts";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // decrease
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'; // increase

interface incomeStatementData {
  id: number;
  name: string;
  currentYear: number;
  percentage: number;
}

interface dataObjects {
  data: incomeStatementData[];
}

const IncomeStatementTable = ({ data }: dataObjects): JSX.Element => {
  return (
    <>
      <React.Fragment>
        <ResponsiveContainer width="auto" height="auto">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Income Statement</TableCell>
                <TableCell>Current Year</TableCell>
                <TableCell>vs PY</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                (row: {
                  id: React.Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  currentYear:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  percentage:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.currentYear}</TableCell>
                    <TableCell><ArrowDropDownIcon sx={{ color: 'red' }} /></TableCell>
                    <TableCell>{row.percentage}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </ResponsiveContainer>
      </React.Fragment>
    </>
  );
};

export default IncomeStatementTable;
