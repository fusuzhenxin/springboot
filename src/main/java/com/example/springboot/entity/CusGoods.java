package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 *
 * </p>
 *
 * @author
 *
 */
@Getter
@Setter
@TableName("cus_goods")
@ApiModel(value = "CusGoods对象", description = "")
public class CusGoods implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("商品名称")
    private String name;

    @ApiModelProperty("食品图片")
    private String img;

    @ApiModelProperty("食品分类")
    private String classification;

    @ApiModelProperty("食品品牌")
    private String brand;

    @ApiModelProperty("生产日期")
    @TableField("product_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime productTime;

    @ApiModelProperty("保质期")
    private String shelf;

    @ApiModelProperty("价格")
    private BigDecimal price;

    @ApiModelProperty("数量")
    private Integer number;


}
