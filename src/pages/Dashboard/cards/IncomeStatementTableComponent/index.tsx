import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // decrease
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"; // increase
import incomeStatementRowDataInterface from "../../../../common/interfaces/data/charts/incomeStatementRowDataInterface";

interface dataObjects {
  data: incomeStatementRowDataInterface[];
}

const IncomeStatementTable = ({ data }: dataObjects): JSX.Element => {
  console.log(data);
  return (
    <>
      <React.Fragment>
        <div style={{ height: "300px", overflow: "auto" }}>
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
                  vsPreviousYear:
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
                    <TableCell>
                      {row.vsPreviousYear ? (
                        <ArrowDropUpIcon sx={{ color: "green" }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>{row.percentage}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    </>
  );
};

export default IncomeStatementTable;
