<template>
  <div class="payroll-table">
    <!-- Table Title -->
    <div class="table-title" id="table-title">Salary Payment - July 2021</div>

    <!-- Payroll Table -->
    <table ref="dataTable" id="user-table" class="display table-bordered nowrap" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>S/N</th>
          <th>STAFF NAME</th>
          <th>BANK NAME</th>
          <th>ACCOUNT NO</th>
          <th>BVN</th>
          <th>STATUS</th>
          <th>REASON</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(staff, index) in staffList" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="staff-name">{{ staff.name }}</td>
          <td>{{ staff.bank }}</td>
          <td>{{ staff.accountNo }}</td>
          <td>{{ staff.bvn }}</td>
          <td>
            <span :class="staff.status === 'SUCCESS' ? 'success-status tran-status' : 'failed-status tran-status'">
              {{ staff.status }}
            </span>
          </td>
          <td>{{ staff.reason }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'datatables.net'
// import 'datatables.net-dt/css/jquery.dataTables.css'

// Sample Data (This can be replaced with API data)
const staffList = ref([
  { name: 'Mykel King', bank: 'Zenith Bank', accountNo: '083930290', bvn: '**** **** 4231', status: 'SUCCESS', reason: 'User not defined' },
  { name: 'Bukola Akinfolarin', bank: 'UBA', accountNo: '083930290', bvn: '**** **** 4231', status: 'FAILURE', reason: 'User not defined' },
  // Add more rows as needed
])

const dataTable = ref(null)

onMounted(() => {
  // Initialize DataTable after the DOM is ready
  if (dataTable.value) {
    $(dataTable.value).DataTable({
      responsive: true,
      pageLength: 5,
      lengthChange: false,
      searching: true,
      ordering: true,
      paging: true,
    })
  }
})
</script>

<style scoped src="@/assets/css/payroll.css"></style>

<style scoped>
.payroll-table {
  text-align: center;
  padding: 20px;
}

.table-title {
  line-height: 3;
}

.success-status {
  color: green;
}

.failed-status {
  color: red;
}

#user-table {
  width: 100%;
  margin-top: 20px;
}

#user-table_filter input {
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #edf2f7;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  font-size: 14px;
  padding: 0 5px;
}
</style>
