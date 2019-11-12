const app = getApp()
Page({
    data: {
        img:''
    },
    bindtouchstart: function(e) {
      	this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
    },
    bindtouchmove: function(e) {
        this.data.context.lineWidth='7';
      	this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
      	this.data.context.stroke();
      	this.data.context.draw(true);
      	this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },
    /**清空画布 */
    bindClear: function() {
        this.data.context.clearRect(0, 0);
        this.data.context.draw();
    },
    bindOk() {
        const that=this;
        this.setCanvasAreaInfo(()=>{
            that.data.context.draw(true , wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: that.data.width,
                height: that.data.height,
                destWidth: that.data.width ,
                destHeight: that.data.height ,
                fileType: 'png',
                quality:1,
                canvasId: 'signatureCanvas',
                success(res) {
                    console.log(res);
                    that.setData({
                        img:res.tempFilePath
                    })
                },
                fail(res) {
                    console.log(res);
                }
            }))
        });
    },
    setCanvasAreaInfo(callBack){
        let query = wx.createSelectorQuery();
        const that = this;
        query.select('#signatureCanvas').boundingClientRect(function (rect) {
            that.setData({
                width:rect.width||0,
                height:rect.height||0
            })
            callBack();
        }).exec();
    },
    onLoad(){
        const that=this;
        const context = wx.createCanvasContext('signatureCanvas');
        this.setData({
            context: context
        })
    }
})