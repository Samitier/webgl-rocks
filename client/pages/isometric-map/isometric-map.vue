<template>
    <div>
        <canvas :id="canvasClass" @mousemove="canvasMove" @click="canvasClick"></canvas>
        <div class='action-buttons-container'>
            <button class='rotate' @click="toggleRotate" :class="{ active: isRotating }"> Rotate </button>
            <button class="edit" @click="toggleEdit" :class="{ active: isEditing }"> Edit </button>
            <button class="reset">Reset</button>
        </div>
        <div class="height-slider-container" v-if="isObjectSelected">
            <input v-model="selectedObjectHeight" @input="changeHeightSelectedObject"
                   class="input-slider" type="range" min="0" max="15" step="0.25">
            </input>
        </div>
    </div>
</template>

<script>
    import { IsometricMap } from './isometric-map.webgl.js'

    export default {
        components: {
        },
        data() {
            return {
                canvasClass: 'isometric-map',
                isometricMap: {},
                isRotating: false,
                isEditing: false,
                isObjectSelected: false,
                selectedObjectHeight: 0
            }
        },
        mounted() {
            this.isometricMap = new IsometricMap( document.getElementById(this.canvasClass) )
        },
        methods: {
            toggleRotate() {
                this.isRotating = !this.isRotating
                this.isometricMap.setRotateAnimation(this.isRotating)
            },
            toggleEdit() {
                this.isEditing = !this.isEditing
                this.isometricMap.setIsSelecting(this.isEditing)
                this.isObjectSelected = false
            },
            canvasMove(event) {
                this.isometricMap.onMouseMove(event)
            },
            canvasClick(event) {
                if(!this.isEditing) return
                this.isObjectSelected = this.isometricMap.onMouseClick(event)
                if(this.isObjectSelected) {
                    this.selectedObjectHeight = this.isometricMap.getSelectedObjectHeight()
                }
            },
            changeHeightSelectedObject() {
                this.isometricMap.setSelectedObjectHeight(this.selectedObjectHeight)
            }
        }
    }
</script>

<style scoped>
    .action-buttons-container, .height-slider-container {
        position:absolute;
        z-index:10;
        bottom: 80px;
        left:50%;
        margin-left:-100px;
        width:200px;
        text-align:center;
    }
    .action-buttons-container > button {
        border: 2px solid white;
        background-color: transparent;
        color: white;
        padding: 0.5em 1em;
        cursor: pointer;
        transition: all 0.5s;
        outline: 0!important;
    }
    .action-buttons-container > button:hover {
        box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.55);
    }
    .action-buttons-container > button.active {
        background-color: white;
        color: #444444;
    }
    .height-slider-container {
        bottom: 35px;
        background-color: white;
        width:150px;
        padding: 2px;
        margin-left:-76px;
        animation: fadeInDown 0.5s forwards;
    }
    .height-slider-container:after {
        content: "";
        position:absolute;
        left:50%;
        top:-10px;
        margin-left:-10px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
    }
    .height-slider-container > input{
        width:85%;
    }
</style>