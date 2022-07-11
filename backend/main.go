package main

import (
	"backend/database"
	"backend/router"
	//"backend/router"
	"backend/settings"
)

func main() {
	option := settings.LoadSettings("backend/settings.json")

	database.Connection(option)

	_ = router.Initialized().Run(option.Address + ":" + option.Port)
}
