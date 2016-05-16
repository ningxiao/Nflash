flash.utils.provide("flash.profile");
//设置遮罩类型
flash.profile.operAtion = {LIGHTER:"lighter",SOURCEOVER:"source-over", SOURCEIN:"source-in", DESTINATIONIN:"destination-in", SOURCEOUT:"source-out", DESTINATIONOUT:"destination-out", SOURCEATOP:"source-atop", DESTINATIONATOP:"destination-atop"};
//渐变类型 LINEAR线性/RADIAL放射
flash.profile.gradientType = {LINEAR:"setLinear",RADIAL:"setRadial"};
//位图填充模式
flash.profile.pattern = {repeat:"repeat",repeatX:"repeat-x",repeatY:"repeat-y",noRepeat:"no-repeat"};
//绘制线段的圆角
flash.profile.lineJoin = {bevel:"bevel",round:"round",miter:"miter"};