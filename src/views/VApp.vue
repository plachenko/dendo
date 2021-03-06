<template>
  <div style="height: 100%: flex: 1; display:flex; width: 100%;">
<div id="left" :class="{noFlex: !show}">
      <DDTop
        :menu="menu"
        @menuChange="menuChange($event)"
        @toggleMenu="show = !show"
        @save="save"
        @clear="clear" />

      <DDSearch
        v-if="menu == 1"
        :class="{hide: !show}"
        :disabled="!projectsWithTitle"
        @searchEvt="search" />

      <div v-if="menu == 1" id="projListContainer" :class="{hide: !show}">
        <div class="projectItem" style="background-color:#EEE; border-bottom: 2px solid;" @click="showPriorities" v-if="priorities.length">
          <div class="inner" style="display:flex;">
            <span class="proj_title" id="priority">Priority</span>
            <span class="item_count" style="font-weight: bold; justify-self:center; padding-bottom:23px;">{{priorities.length}}</span>
          </div>
        </div>

        <DDProjItem
          @setTitle="setTitle($event)"
          @remove="removeProject()"
          @select="select(k)"
          @starred="starred($event)"
          v-for="(project, k) in searchResult"
          :current="current == k"
          :class="{current: current == k}"
          :project="project"
          :key="k" />
      </div>

      <div v-if="menu==2">
        <div class="projectItem">
          <!-- <div class="inner btn">Github</div> -->
          <a :href="`https://github.com/login/oauth/authorize${clientID}`" style="display: block;" class="inner btn" @click="loginToGH">Login to github</a>
        </div>
      </div>

      <div
        v-if="!adding && menu == 1"
        @click="addProject()"
        :class="{hide: !show}"
        class="btn add_btn">
        <span>+ New list</span>
      </div>
    </div>

    <div id="right" :class="{hide: show}">
      <DDPrioShow
        v-if="menu == 1 && current < 0 && projects.length"
        :items="priorities"
        />

      <DDListShow
        v-if="menu == 1 && current >= 0"
        ref="list"
        :project="projects[current]"
        :current="current"
        @removeItem="removeItem($event)"
        @createItem="createItem($event)"
        @removeProject="removeProject"
         />

      <div v-else-if="menu == 2">
        <div id="projTitle">
          <h2>Github</h2>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import DDProject from '../util/DDProject';
import DDTop from '../components/DDTop.vue';
import DDSearch from '../components/DDSearch.vue';
import DDProjItem from '../components/DDProjItem.vue';
import DDItem from '../components/DDProjItem.vue';
import DDListShow from '../components/DDListShow.vue';
import DDPrioShow from '../components/DDPrioShow.vue';

import { EventBus }  from '../eventbus';
import _ from 'lodash';

@Component({
  components:{
    DDTop,
    DDSearch,
    DDProjItem,
    DDItem,
    DDListShow,
    DDPrioShow
  }
})
export default class App extends Vue {
  private show = false;
  private projects: DDProject[] = [];
  private current = 0;
  private projSearch = "";
  private adding = false;
  private itemInp = [];
  private lastCur = 0;
  private menu = 1;
  private clientID = process.env.VUE_APP_CLIENTID;
  private redirect = process.env.VUE_APP_REDIRECT;
  private prioShow = false;

  $refs!: {
    list: DDListShow;
  }

  private search(e: string){
    this.projSearch = e;
  }

  @Watch('projects', {deep: true})
  private projChange(v: DDProject[]){
    this.save();
  }

  mounted(){
    if(localStorage.getItem('projects')){
      this.load();
    }

    if(this.clientID){
      this.clientID = "?client_id="+this.clientID;
    }

    if(this.redirect){
      this.redirect = "&redirect_uri="+this.redirect;
    }

    this.startTicker();

    if(!this.projects.length){
      this.show = true;
    }
  }

  get priorities(){
    const arr = [];
    let arr2 = [];
    const f = this.projects;
    for(let i = 0; i <= f.length-1; i++){
      arr2 = f[i].items.filter(j => j.star == true);
      if(arr2.length){
        arr.push(arr2);
      }
    }

    return _.flatMap(arr);
    /*
    if(this.projects){
      const starmap = this.projects.map(i => i.items.some(e => e.star == true));
      return starmap.some(e => e == true);
    }else{
      return false;
    }
    */
  }

  get projectsWithTitle(){
    return this.projects.some(i => i.title.length)
  }

  get searchResult(){
    const arr = this.projects.filter((item: DDProject) => {
      return this.projSearch.toLowerCase().split(' ').every((i: string) => item.title.toLowerCase().includes(i));
    })

    return arr;
  }

  public showPriorities(){
    this.current = -1;
    this.prioShow = true;
  }

  public startTicker(){
    setInterval(() =>{
      if(this.projects.length && this.current >= 0){
        const startedEl = this.projects[this.current].items.find(i => i.started);

        if(startedEl){
          startedEl.timeSpent++
        }
      }
    }, 1000);
  }

  public menuChange(e: number){
    this.menu = e;
  }

  public removeProject(){
    let id = 0;

    if(this.projects.length > 1){
      id = this.projects.findIndex((i) => i.id == this.projects[this.current].id);
    }

    this.projects.splice(id, 1);
    if(this.projects[this.lastCur]){
      this.current = this.lastCur;
    } else {
      this.current = this.projects.length - 1;
    }
    this.adding = false;
  }

  public addProject(){
    this.adding = true;

    if(this.current >=0){
      this.$refs.list.reset();
    }

    this.projSearch = "";
    const proj = new DDProject();
    this.projects.push(proj);
    this.lastCur = this.current;
    this.current = this.projects.length - 1;
  }

  public setTitle(e: string){
    this.adding = false;
    if(this.show){
      this.show = false;
    }

    this.projects[this.projects.length-1].title = e;
  }

  public load(){
    this.current = JSON.parse(localStorage.getItem('current') || "");
    if(this.current < 0){
      this.current = 0;
    }
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '{}');
    for(const proj of savedProjects){
      this.projects.push(new DDProject(proj.title, proj.items));
    }
  }

  public save(){
    if(this.projectsWithTitle){
      localStorage.setItem('current', this.current+"");
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  public clear(){
    const clearConfirm = confirm('Are you sure you want to clear?');
    if(clearConfirm){
      DDProject.reset();
      EventBus.$emit('clear');
      this.adding = false;
      this.projects = [];
      localStorage.clear();
    }
  }

  public select(e: number){
    if(!this.prioShow){
      this.$refs.list.reset();
    }else{
      this.prioShow = false;
    }

    if(this.adding){
      this.removeProject()
      this.adding = false;
    }
    this.current = e;
    localStorage.setItem('current', this.current+"");
  }

  public createItem(e: string){
    this.projects[this.current].createItem(e);
  }

  public removeItem(k: number){
    this.projects[this.current].items.splice((this.projects[this.current].items.length - 1) - k, 1);
  }

  private loginToGH(){

    /*
    fetch(`https://github.com/login/oauth/authorize`, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'applicaiton/json',
      },
      mode:'no-cors'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    */
  }
}
</script>

<style>
*, html{
  margin: 0px;
  padding: 0px;
  }
  html{
    height: 100%;
    }
    body{
      height: 100%;
      }

@media (max-width: 600px) {
  #app{
    flex-flow: column;
    }
    #left{
      height: 100%;
      display: flex;
      flex-flow: column;
      }
      .noFlex{
        /* height: 0px; */
        display: block !important;
        flex:0 !important;
      }
      .hide{
        display: none !important;
        }
        .hide #projListContainer{
          direction: ltr !important;
        }

        .projItem{
          flex-basis: 30% !important;
        }
}
@media (max-width: 1000px) and (min-width: 600px){
      .projItem{
        flex-basis: 20% !important;
      }
}

@media (min-width: 600px){
  #app{
    flex-flow: row;
    }
    #left{
      flex-basis: 20%;
      height: 100%;
      flex: 1;
      display: flex;
      flex-flow: column;
      max-width: 300px;
      border-right: 1px solid;
      }
      #show_btn{
        display: none !important;
      }
      .projItem{
        flex-basis: 60%;
      }
}

#priority{
  font-weight:bold;
  width: 100%;
}

#projListContainer{
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: auto;
  direction: rtl;
  }
  #projList{
    display: flex;
    flex-flow: column;
    }
.search{
  padding: 10px;
  border-bottom: 1px solid;
  }
  .search input{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    }

.add_btn{
  padding: 20px;
  font-weight: bold;
  box-sizing: border-box;
  border-top: #CCC 1px dashed;
  }

.submitCont{
  border-top: 2px solid;
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
}

.projectInnerItem{
  padding: 20px;
  border-bottom: 1px solid;
}

.btn{
  user-select: none;
  cursor: pointer;
  }
  .btn:hover{
    background-color:#CCC;
    }

.current{
  background-color:#EEE;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  }
  #left{
    min-width: 170px;
    }

  #right{
    background-color:#CCC;
    flex: 1;
    height: 100%;
    min-width: 350px;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    }
    #list_title{
      border-bottom: #CCC 1px dashed;
      padding: 10px 10px 10px 10px;
      height: 90px;
      }
      #list_title input[type=text]{
        padding: 5px 5px 4px 5px;
        width: 80%;
        box-sizing: border-box;
        }
      #list_title input[type=submit]{
        width: 19%;
        margin-left: 1%;
        padding: 5px 5px 4px 5px;
        }
      #list-title .inner{
        display: inline-block;
        margin-left: 20px;
        }
    #list_container{
      padding: 0px 10px;
      }
      #list_container input[type=text]{
        width: 80%;
        box-sizing: border-box;
        padding: 10px;
        margin: 10px 0px;
        }
      #list_container input[type=submit]{
        width: 19%;
        margin-left: 1%;
        padding: 10px;
        }

    li{
      cursor: pointer;
      user-select: none;
      border-bottom: 1px solid;
      padding: 20px 0px;
      }
      .done span{
        text-decoration: line-through;
        }

.done{
  background-color:#DDD !important;
}

#addbtn{
  font-weight: bold;
  color:#444;
  border-right: #000 2px solid;
  box-sizing: border-box;
  flex:1;
  text-align: center;
  padding: 15px;
  }

#cancelbtn{
  font-weight: bold;
  color:#FFF;
  background-color:#444;
  flex:1;
  text-align: center;
  padding: 15px;
  }


#projItemCont{
  flex: 1;
  height: 100%;
  background-color:#CCC;
  box-sizing: border-box;
}
#projItemInner{
  display: flex;
  flex-flow: column;
  height: 100%;
  flex:1;
  width: 100%;
}

#projList{
  flex: 1;
  overflow: auto;
  }
  #noProj{
    color:#AAA;
    }

</style>
