
import { SimpleLineChart } from "@/components/SimpleLineChart";
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
              <h1>Ranks Parents Chart</h1>
              <SimpleLineChart data={responseData} reversed={true} />
            </div>
          );
        // case "anotherCondition":
        //   return (
        //     <div>
        //       <h1>Another Condition Chart</h1>
        //       <SimpleLineChart data={responseData} someOtherProp={value} />
        //     </div>
        //   );
        // case "yetAnotherCondition":
        //   return (
        //     <div>
        //       <h1>Yet Another Condition Chart</h1>
        //       <SimpleLineChart data={responseData} someProp={otherValue} />
        //     </div>
        //   );
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
        <h2>Form Data</h2>
        <p>{JSON.stringify(formData, null, 2)}</p>
  
        <h2>Response Data</h2>
        {renderChart()}
      </div>
    );
  };
  export default ChildComponent;
  