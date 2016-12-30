<template>
  <div>
    <h3>分页表格</h3>
    <el-table :data="dataSet" stripe>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="position" label="Position"></el-table-column>
      <el-table-column prop="office" label="Office"></el-table-column>
      <el-table-column prop="extn" label="Extn."></el-table-column>
      <el-table-column prop="startDate" label="Start date"></el-table-column>
      <el-table-column prop="salary" label="Salary"></el-table-column>
    </el-table>
    <el-pagination class="float-xs-right mt-1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      const dataSet = [
        {
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          extn: "5421",
          startDate: "2011/04/25",
          salary: "$320,800"
        },
        {
          name: "Garrett Winters",
          position: "Accountant",
          office: "Tokyo",
          extn: "8422",
          startDate: "2011/07/25",
          salary: "$170,750"
        },
        {
          name: "Ashton Cox",
          position: "Junior Technical Author",
          office: "San Francisco",
          extn: "1562",
          startDate: "2009/01/12",
          salary: "$86,000"
        },
        {
          name: "Cedric Kelly",
          position: "Senior Javascript Developer",
          office: "Edinburgh",
          extn: "6224",
          startDate: "2012/03/29",
          salary: "$433,060"
        },
        {
          name: "Airi Satou",
          position: "Accountant",
          office: "Tokyo",
          extn: "5407",
          startDate: "2008/11/28",
          salary: "$162,700"
        },
        {
          name: "Brielle Williamson",
          position: "Integration Specialist",
          office: "New York",
          extn: "4804",
          startDate: "2012/12/02",
          salary: "$372,000"
        },
        {
          name: "Herrod Chandler",
          position: "Sales Assistant",
          office: "San Francisco",
          extn: "9608",
          startDate: "2012/08/06",
          salary: "$137,500"
        },
        {
          name: "Rhona Davidson",
          position: "Integration Specialist",
          office: "Tokyo",
          extn: "6200",
          startDate: "2010/10/14",
          salary: "$327,900"
        },
        {
          name: "Colleen Hurst",
          position: "Javascript Developer",
          office: "San Francisco",
          extn: "2360",
          startDate: "2009/09/15",
          salary: "$205,500"
        }
      ]
      return {dataSet: dataSet}
    }
  }
</script>
