
import { SimpleLineChart } from "@/components/SimpleLineChart";
import  {StackedBarChart}  from "@/components/StackedBarChart";

interface ChildComponentProps {
    formData: any;
    responseData: any;
  }
  

 function ChildComponent({ formData, responseData }: ChildComponentProps) {
    console.log("formData dentro de childe", formData);

  
    const renderChart = () => {
      switch (formData.accountType) {
        case "ranksParents":
          return (
            <div>
              <h2  className= "text-center text-2xl font-semibold" >Product Family Position Range Chart </h2>
              <SimpleLineChart data={responseData} reversed={true} />
            </div>
          );
        case "grossSalesParent":
          return (
            <div>
              <h2  className= "text-center text-2xl font-semibold" >Gross Billing Amounts (Excluding Tax and Discounts) </h2>
              <SimpleLineChart data={responseData} />
            </div>
          );
        case "cancelledOrders":
          return (
            <div>
              <h2  className= "text-center text-2xl font-semibold" >Canceled orders</h2>
              <SimpleLineChart data={responseData} />
            </div>
          );

          case "ordersByParent":
            return (
              <div>
                <h2  className= "text-center text-2xl font-semibold" >Quantity of Orders by Product Family</h2>
                <SimpleLineChart data={responseData} />
              </div>
            ); 
            case "state":
              return (
                <div>
                  <h2  className= "text-center text-2xl font-semibold" >Quantity of Orders by states</h2>
                  <StackedBarChart data={responseData} />

                </div>
              ); 

        default:
          return (
            <div>
              <h1>Default Chart</h1>
              <SimpleLineChart data={responseData} />
            </div>
          );
      }
    };
  
    return (
      <div>
        {/* <h2>Form Data</h2>
        <p>{JSON.stringify(formData, null, 2)}</p> */}
  
        {/* <h2>Response Data</h2> */}
        {renderChart()}
      </div>
    );
  };
  export default ChildComponent;
  