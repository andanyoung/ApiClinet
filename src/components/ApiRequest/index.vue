<template>
  <div class="api">
    <div class="api-request">
      <pre class="pre-doc">{{api.doc}}</pre>
      <div class="api-url">

        <el-input placeholder="请输入URL"
                  v-model="http.url"
                  class="input-with-select">
          <el-select v-model="http.method"
                     slot="prepend"
                     placeholder="请选择">
            <el-option v-for="item in http.methods"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
          <el-button slot="append"
                     @click="handleSend()"
                     :loading="send_btnloading">send</el-button>
        </el-input>
      </div>

      <el-form ref="form"
               label-width="80px">
        <el-form-item v-for="item in api.parameters"
                      :label="item.name + ':'"
                      :key="item.index">
          <el-input v-model="item.value"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="api-response">
      <el-tabs type="border-card">
        <el-tab-pane label="Response">
          <el-divider content-position="left">Data</el-divider>
          <pre class="api-json"
               v-if="response.content_type==='json'">{{ response.data }}</pre>
          <div class="api-json"
               v-else>{{ response.data }}</div>

          <el-divider content-position="left">Headers</el-divider>
          <pre class="api-json">{{ response.headers }}</pre>

        </el-tab-pane>

        <el-tab-pane label="Request">
          <el-divider content-position="left">Headers</el-divider>
          <pre class="api-json">{{ request.headers }}</pre>
          <el-divider content-position="left">Params</el-divider>
          <pre class="api-json">{{ request.params }}</pre>
          <el-divider content-position="left">Body</el-divider>
          <pre class="api-json">{{ request.body }}</pre>
        </el-tab-pane>

        <el-tab-pane label="General">
          <pre class="api-json">{{ general }}</pre>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>

export default {
  data() {

    return {
      general: { 'Request URL': '', 'Request Method': '', 'Status Code': '' },
      request: { headers: '' },
      response: {
        data: '',
        headers: '',
        params: '',
        body: '',
        content_type: ''
      },
      http: {
        url: '',
        method: 'GET',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      },
      send_btnloading: false,
      api: {
        uri: '/NBLot',
        doc: '/** 下发命令\n     * @param $content\n     * @param $deviceId\n     * @param string $operator\n     * @return \\Psr\\Http\\Message\\StreamInterface\n     */',
        name: '',

        parameters: [{
          "name": "content",
          "type": "string",
          "value": null,
          "field": "content"
        },
        {
          "name": "deviceId",
          "type": "string",
          "value": null,
          "field": "deviceId"
        },
        {
          "name": "operator",
          "type": "string",
          "value": "ZD001",
          "field": "operator"
        }]
      }
    }
  },
  props: ['module', 'controller', 'action'],
  created() {
    this.fetchActions();
  },
  components: {

  },
  methods: {
    fetchActions() {
      this.$store.dispatch('FECTHAPIACTIONS', { module: this.module, controller: this.controller, action: this.action }).then(data => {
        this.http.url = this.$store.getters.base_uri + '/' + data.uri;
        this.api = data;
      })
    },
    handleSend() {
      let params = {};
      this.api.parameters.forEach(param => {
        params[param.name] = param.value
      });

      let http = { url: this.http.url, method: this.http.method, params: params }
      this.send_btnloading = true;
      this.$store.dispatch('REQUEST', http).then(res => {

        this.handleResponse(res)
        this.send_btnloading = false;
      }).catch(error => {

        let res = error.response
        this.handleResponse(res)
        this.send_btnloading = false;
      })
    },
    handleResponse(res) {

      this.response.data = JSON.stringify(res.data, null, 4);
      this.response.headers = res.headers;
      this.response.content_type = this.response.headers['content-type']
      if (this.response.data.indexOf('<!DOCTYPE html>') > -1) {
        this.response.content_type = 'html';
      } else {
        this.response.content_type = 'json';
      }

      this.request.headers = res.config.headers;
      this.request.params = res.config.params;
      this.request.data = res.config.data;

      this.general['Request URL'] = res.config.url
      this.general['Request Method'] = res.config.method.toUpperCase()
      this.general['Status Code'] = res.status + ' ' + res.statusText

    }

  },

}
</script>

<style lang="less" scoped>
.api {
  display: flex;
  justify-content: space-around;
}
.api-request {
  width: 40%;
  min-width: 520px;
  .pre-doc {
    background-color: #f0f9eb;
    color: #67c23a;
    border-radius: 5px;
  }
  .api-url {
    margin-bottom: 22px;
    .el-input-group__prepend {
      .el-select {
        width: 100px;
      }
    }
  }
}

.api-response {
  min-width: 520px;
  max-width: 600px;
  .api-json {
    width: 100%;
  }
}
</style>

