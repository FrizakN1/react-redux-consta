package settings

import (
	"backend/utils"
	"encoding/json"
)

type Settings struct {
	Address   string
	Port      string
	DbAddress string
	DbPort    string
	DbUser    string
	DbPass    string
	DbName    string
}

var settings Settings

func LoadSettings(filename string) *Settings {
	bytes, e := utils.LoadFile(filename)
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}
	e = json.Unmarshal(bytes, &settings)
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}
	return &settings
}
