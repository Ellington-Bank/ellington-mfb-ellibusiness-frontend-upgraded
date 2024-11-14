<template>
  <div class="settings-table-div content-container">
      <div class="container rel">
        <div class="sect-title-header flex-div">
          <h5 class="sect-title fg-1">2 Users</h5>
          <div>
            <button class="sec-bg submit-btn modal-trigger" data-target="add-user-modal">Invite New User</button>
          </div>
        </div>
        <table id="users-settings-table" class="display table-bordered nowrap" cellspacing="0" width="100%">
          <thead>
              <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>LAST LOGIN</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td class="user-name">Mykel King</td>
                  <td>mykelking@yahoo.com</td>
                  <td>Owner</td>
                  <td>12:23, 27th April, 2021</td>
              </tr>
              <tr>
                  <td class="user-name">Ellie Diadem</td>
                  <td>eleana.diadem@gmail.com</td>
                  <td>Administrator</td>
                  <td>22:31, 28th April, 2021</td>
              </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script setup>
</script>

<style scoped src="@/assets/css/roles-settings.css"></style>

<style scoped>
.content-container{
    margin-top: 10px !important;
}
.content-container > .container.rel {
  min-height: calc(100vh - 134px - 3em);
  padding: 20px 30px 10px;
  border: none;
  box-shadow: 0px 5px 24px rgb(12 37 86 / 15%);
  margin: 0 auto;
  width: 100%;
}
.sect-title-header {
    margin-bottom: 20px;
}
table#users-settings-table{
  margin-bottom: 30px;
  font-size: 14px;
}
thead tr {
    background: #DEE3ED;
}
td, th {
  padding: 15px 20px;
}
</style>