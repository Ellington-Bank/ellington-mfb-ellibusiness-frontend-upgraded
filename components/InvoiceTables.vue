<template>
  <div class="invoice-table-div">
      <table id="invoice-table" class="display table-bordered nowrap" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Invoice ID</th>
                <th>CLIENT NAME</th>
                <th>AMOUNT</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
                <th>PAID VIA</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2021001</td>
                <td class="client-name">Mykel King</td>
                <td>NGN 20,000</td>
                <td>20th May, 2021</td>
                <td>
                    <span class="success-status tran-status">PAID</span>
                </td>
                <td>Bank Transfer</td>
            </tr>
            <tr>
                <td>2021002</td>
                <td class="client-name">Bukola Akinfolarin</td>
                <td>NGN 10,000</td>
                <td>12th Jan., 2021</td>
                <td>
                    <span class="failed-status tran-status">UNPAID</span>
                </td>
                <td> - </td>
            </tr>
            <tr>
                <td>2021003</td>
                <td class="client-name">Ellena Tobi</td>
                <td>NGN 30,000</td>
                <td>12th Apr., 2021</td>
                <td>
                    <span class="draft-status tran-status">DRAFT</span>
                </td>
                <td> Card </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import 'datatables.net'
import 'datatables.net-dt'
import "datatables.net-dt/css/jquery.dataTables.min.css"

// import $ from 'jquery'

export default {
    name: "InvoiceTable",
}
</script>


<style>
div#invoice-table_length > label {
    display: none;
}
div#invoice-table_filter label {
    height: calc(3rem + 5px);
    overflow: hidden;
    display: block;
    position: relative;
    width: 100%;
    padding: 0 2px;
}
div#invoice-table_filter input[type="search"] {
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
input:focus{
    border-bottom: 1px solid var(--sec-color) !important;
    box-shadow: 0 1px 0 0 var(--sec-color) i !important;
}
th.sorting {
    font-weight: 600;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #8492A6;
}
.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    color: #333 !important;
    border: 1px solid rgb(151, 151, 151, 0.5);
    background: var(--pry-color);
    color: white !important;
    border-radius: 50%;
}
.dataTables_wrapper .dataTables_paginate .paginate_button{
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
    /* width: 82.5px; */
    text-align: center;
    padding: 6px
}
span.success-status {
    background-color: #66CB9F;
}
span.failed-status {
    background: rgb(255, 146, 174);
}
span.draft-status {
    background: rgba(255, 202, 40);
}
.client-name{
    color: #2F80ED;
}
#invoice-table th {
    font-weight: bold;
    font-size: 13px;
    line-height: 20px;
}
#invoice-table td {
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
}
</style>