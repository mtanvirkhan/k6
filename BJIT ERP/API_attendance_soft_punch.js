import http from 'k6/http';
import { group, check} from 'k6';

//console.log(csvData);

export const options = {
  vus: 1,
  iterations: 1
};

export default function () {
  group("Testing BJIT Soft punch attendance", function () {

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'session_id=2dfe59629081ececc2a39bc8cb9f9edac7d5be4d',
        'Host': 'erp.bjitgroup.com',
        'Cache-Control': 'no-cache'
      }
    };

    const payload = JSON.stringify({
      "jsonrpc":"2.0",
      "method":"call",
      "params":{
          "args":[[1115],"hr_attendance.hr_attendance_action_my_attendances"],
          "model":"hr.employee",
          "method":"attendance_manual",
          "kwargs":{}
      },
          "id":448010191
  });


    group("Soft punch testing", function () {
      let res = http.post("https://erp.bjitgroup.com/web/dataset/call_kw/hr.employee/attendance_manual", payload, params);

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);
    
      const jsonResponse = JSON.parse(res.body);

      check(res, {
        'is status 200': (r) => r.status === 200,
        'is JSON-RPC 2.0': (r) => jsonResponse.jsonrpc === '2.0',
        'is id 448010191': (r) => jsonResponse.id === 448010191,
        'has action with correct id': (r) => jsonResponse.result.action.id === 449,
        'has employee name': (r) => jsonResponse.result.action.employee_name === 'M Tanvir Khan',
        'has correct worked hours': (r) => jsonResponse.result.action.attendance.worked_hours === 11.8430555555556,
        'has correct department': (r) => jsonResponse.result.action.attendance.department_id[1] === 'CEO / ED / Quality & Process Assurance / SQA-1',
      });
    });
  });
}
