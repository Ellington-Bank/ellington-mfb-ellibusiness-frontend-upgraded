<template>
  <div class="tranx-table-div">
    <table ref="tableRef" id="tranx-table" class="display table-bordered nowrap" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Trans. ID</th>
          <th>CLIENT NAME</th>
          <th>AMOUNT</th>
          <th>PAID VIA</th>
          <th>TRANS. TYPE</th>
          <th>STATUS</th>
          <th>TIME</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.id }}</td>
          <td class="client-name">{{ transaction.clientName }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.paidVia }}</td>
          <td :class="transaction.type === 'Debit' ? 'red-text' : 'sec-color'">
            {{ transaction.type }}
          </td>
          <td>
            <span 
              class="tran-status" 
              :class="{
                'success-status': transaction.status === 'SUCCESSFUL',
                'failed-status': transaction.status === 'FAILED',
                'pending-status': transaction.status === 'PENDING'
              }"
            >
              {{ transaction.status }}
            </span>
          </td>
          <td>{{ transaction.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'

const tableRef = ref(null)

// Sample data - replace with your actual data source
const transactions = ref([
  {
    id: '2021001',
    clientName: 'Mykel King',
    amount: 'NGN 20,000',
    paidVia: 'Bank Transfer',
    type: 'Debit',
    status: 'SUCCESSFUL',
    time: '12:20pm 20-Apr-2021'
  },
  {
    id: '2021002',
    clientName: 'Winifred Justina Chukwudi',
    amount: 'NGN 10,000',
    paidVia: 'Card',
    type: 'Credit',
    status: 'FAILED',
    time: '01:20pm 21-Apr-2021'
  },
  {
    id: '2021003',
    clientName: 'Kene Chidi Arinze',
    amount: 'NGN 5,000',
    paidVia: 'POS',
    type: 'Credit',
    status: 'SUCCESSFUL',
    time: '10:20am 02-May-2021'
  },
  {
    id: '2021004',
    clientName: 'Segun Alfred Tobiloba',
    amount: 'NGN 5,000',
    paidVia: 'Bank Transfer',
    type: 'Debit',
    status: 'SUCCESSFUL',
    time: '12:20am 05-May-2021'
  },
  {
    id: '2021005',
    clientName: 'Uju Oreoluwa Tobiloba',
    amount: 'NGN 5,000',
    paidVia: 'Card',
    type: 'Debit',
    status: 'PENDING',
    time: '12:20am 05-May-2021'
  }
])

onMounted(() => {
  // Initialize DataTable
  $(tableRef.value).DataTable({
    responsive: true,
    ordering: true,
    info: false,
    lengthChange: false,
    pageLength: 10
  })
})
</script>

<style>
div#tranx-table_length > label {
  display: none;
}

div#tranx-table_filter label {
  height: calc(3rem + 5px);
  overflow: hidden;
  display: block;
  position: relative;
  width: 100%;
  padding: 0 2px;
}

div#tranx-table_filter input[type="search"] {
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, .1);
  background: #EDF2F7;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin-top: -2rem;
  font-size: 14px;
  padding: 0 5px;
  width: calc(100% - 10px);
}

input:focus {
  border-bottom: 1px solid var(--sec-color) !important;
  box-shadow: 0 1px 0 0 var(--sec-color) !important;
}

th.sorting {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8492A6;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current,
.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
  color: #333 !important;
  border: 1px solid rgb(151, 151, 151, 0.5);
  background: var(--pry-color);
  color: white !important;
  border-radius: 50%;
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
  border-radius: 50%;
  font-size: 14px;
}
</style>

<style scoped>
span.tran-status {
  color: white;
  border-radius: 6px;
  font-size: 10px;
  display: block;
  text-align: center;
  padding: 6px;
}

span.success-status {
  background-color: #66CB9F;
}

span.failed-status {
  background: rgb(255, 146, 174);
}

span.pending-status {
  background: goldenrod;
}

.client-name {
  color: #2F80ED;
}

#tranx-table th {
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
}

#tranx-table td {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
}
</style>