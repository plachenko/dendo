<template>
  <div class="projectItem">

    <div v-if="!project.title" class="inner_inp">
      <form id="frm" ref="newItem" @keyup.esc="$emit('remove')" @submit.prevent="$emit('setTitle', titleInp)">
        <input
          ref="inp"
          type="text"
          autocomplete="off"
          v-model="titleInp"
          placeholder="Untitled" />
      </form>
      <div id="optContainer">
        <div class="opt btn" @click="remove">X</div>
        <div class="opt btn" @click="add">&#10004;</div>
      </div>
    </div>

    <div v-else @click="$emit('select')" class="inner">
      <span class="proj_title">{{ project.title }}</span>
      <span class="item_count" :class="{right: itemsDone.length}" v-if="project.items.length - itemsDone.length">{{project.items.length - itemsDone.length}}</span>
      <span class="item_count donei" :class="{left: project.items.length > itemsDone.length}" v-if="itemsDone.length">{{itemsDone.length}}</span>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DDProject from '../util/DDProject';

@Component({})
export default class DDProjItem extends Vue{
  $refs!: {
    newItem: HTMLFormElement;
    inp: HTMLInputElement;
  }
  @Prop({default: () => new DDProject() })
  project!: DDProject;

  @Prop({default: false})
  current!: boolean;

  get itemsDone(){
    return this.project.items.filter(i => i.done == true);
  }

  private titleInp = "";

  private remove(){
    this.$emit('remove');
  }

  private add(){
    const title = this.titleInp ? this.titleInp : "Untitled";
    this.$emit('setTitle', title);
  }

  mounted(){
    if(!this.project.title){
      this.$refs.inp.focus();
    }
  }
}
</script>
<style>
#optContainer{
  display: flex;
  flex: 1;
  flex-basis: 30%
}
#frm{
  margin-right: 10px;
  flex-basis: 70%;
  }
.right{
  border-radius: 0px 10px 10px 0px !important;
}
.donei{
  background-color:#444 !important;
  color:#FFF;
}
.left{
  border-radius: 10px 0px 0px 10px !important;
}

.projectItem{
  border-bottom: #CCC 1px solid;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  direction: ltr;
  }
  .projectItem:hover{
    background-color:#EEE;
    }
  .inner, .inner_inp{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    }
    .inner{
      height: 55px;
      padding: 20px;
      }
    .inner_inp{
      padding: 10px;
      display: flex;
      }
      .inner_inp input{
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        }

      .opt{
        flex: 1;
        display: flex;
        place-items: center;
        justify-content: center;
        border: 1px solid;
        }
      .opt:first-child{
        margin-right: 3px;
        }

.proj_title{
  display: block;
  width: 60%;
  text-overflow: ellipsis;
  overflow: hidden;
  float: left;
  white-space: nowrap;
  }
.item_count {
  background-color: #CCC;
  float: right;
  display: block;
  padding: 5px;
  margin-top: -5px;
  border-radius: 10px;
  }
</style>
