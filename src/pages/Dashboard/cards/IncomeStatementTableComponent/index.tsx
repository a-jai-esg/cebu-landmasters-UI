import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // decrease
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"; // increase
import incomeStatementRowDataInterface from "../../../../common/interfaces/data/charts/incomeStatementRowDataInterface";
import commonFunctions from "../../../../common/functions/commonFunctions";
interface dataObjects {
  data: incomeStatementRowDataInterface[];
}

const IncomeStatementTable = ({ data }: dataObjects): JSX.Element => {
  const commonFunc = new commonFunctions();
  return (
    <>
      <React.Fragment>
        <div style={{ height: "300px", overflow: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, fontSize: "13px" }}>
                  Income Statement
                </TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "13px" }}>
                  Current Year
                </TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "13px" }}>
                  vs PY
                </TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "13px" }}>
                  Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                (row: {
                  id: React.Key | null | undefined;
                  name:
                    | string
                    // | number
                    // | boolean
                    // | React.ReactElement<
                    //     any,
                    //     string | React.JSXElementConstructor<any>
                    //   >
                    // | Iterable<React.ReactNode>
                    // | React.ReactPortal
                    | null;
                  // | undefined;
                  currentYear: // | string
                  | number
                    // | boolean
                    // | React.ReactElement<
                    //     any,
                    //     string | React.JSXElementConstructor<any>
                    //   >
                    // | Iterable<React.ReactNode>
                    // | React.ReactPortal
                    | null;
                  // | undefined;
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
                  percentage: // | string
                  | number
                    // | boolean
                    // | React.ReactElement<
                    //     any,
                    //     string | React.JSXElementConstructor<any>
                    //   >
                    // | Iterable<React.ReactNode>
                    // | React.ReactPortal
                    | null;
                  // | undefined;
                }) => (
                  <TableRow key={row.id}>
                    {row.name === "Commissions" ||
                    row.name === "Management Fee Expense" ||
                    row.name === "Professional and Legal Fees" ||
                    row.name === "Security and Janitorial" ||
                    row.name === "Taxes and Licenses" ? (
                      <TableCell sx={{ paddingLeft: 5, fontWeight: 300 }}>
                        {row.name}
                      </TableCell>
                    ) : (
                      <TableCell sx={{ fontWeight: 400 }}>{row.name}</TableCell>
                    )}

                    <TableCell>
                      {commonFunc.formatCurrencyToPHP(row.currentYear)}
                    </TableCell>
                    <TableCell>
                      {row.vsPreviousYear ? (
                        <ArrowDropUpIcon sx={{ color: "green" }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    
                      {row.vsPreviousYear ? (<TableCell sx={{ color: "green" }}>{commonFunc.formatNumberToTwo(row.percentage)+"%"}</TableCell> )
                      : (<TableCell sx={{ color: "red" }}>{commonFunc.formatNumberToTwo(row.percentage)+"%"}</TableCell>)
                      } 

                    
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
