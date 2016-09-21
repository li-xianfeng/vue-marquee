<template>
    <li class="broadcast-item">{{content}}</li>
</template>
<style lang="less">
    .broadcast-item{
        height: 30px;
        width: 100%;
        background-color: yellow;
        line-height: 30px;
        text-align: center;
    }
</style>
<script type="text/javascript">
    export default{
        props: {
            content: {
                default: 0
            }
        }
    }
</script>