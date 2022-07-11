package router

import (
	"backend/database"
	"backend/utils"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Initialized() *gin.Engine {

	router := gin.Default()
	routerAPI := router.Group("/api")

	router.Use(cors.Default())
	routerAPI.Use(cors.Default())

	routerAPI.PUT("/addOrder", addOrder)
	routerAPI.GET("/getZones", getZones)
	routerAPI.POST("/getTableData", getTableData)

	return router
}

//func CORSMiddleware() gin.HandlerFunc {
//	return func(c *gin.Context) {
//		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
//		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
//		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
//		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
//
//		if c.Request.Method == "OPTIONS" {
//			c.AbortWithStatus(204)
//			return
//		}
//
//		c.Next()
//	}
//}

func getTableData(c *gin.Context) {
	var searchText database.Search
	e := c.BindJSON(&searchText)
	if e != nil {
		utils.Logger.Println(e)
	}
	var data []database.Order
	data = database.GetTableData(searchText.Text)
	c.JSON(200, data)
}

func getZones(c *gin.Context) {
	var zones []database.Zone
	zones = database.GetZones()
	c.JSON(200, zones)
}

func addOrder(c *gin.Context) {
	var order database.Order
	e := c.BindJSON(&order)
	if e != nil {
		utils.Logger.Println(e)
		return
	}
	c.JSON(200, order.AddOrder())
}
