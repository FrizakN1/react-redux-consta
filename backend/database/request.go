package database

import (
	"backend/utils"
	"database/sql"
	_ "github.com/lib/pq"
	"strings"
)

type Order struct {
	ID           int
	Recipient    string
	Date         string
	RequiredDate string
	State        string
	Zone         string
	ZoneID       int
	StateID      int
}

type Zone struct {
	ID   int
	Name string
}

type Search struct {
	Text string
}

var query map[string]*sql.Stmt

func prepareRequest() []string {
	query = make(map[string]*sql.Stmt)
	errors := make([]string, 0)
	var e error

	query["GetZones"], e = Link.Prepare(`SELECT "id", "Name" FROM "Zones"`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["AddOrder"], e = Link.Prepare(`INSERT INTO "Orders"("Recipient", "Date", "Required_date", "State", "Zone") VALUES ($1,CURRENT_TIMESTAMP,$2,$3,$4)`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["GetTableData"], e = Link.Prepare(`SELECT "ID", "Recipient", "Date", "Required_date", s."Name", s."id", z."Name" FROM "Orders" AS o INNER JOIN "States" AS s ON o."State"=s."id" INNER JOIN "Zones" AS z ON o."Zone"=z."id" WHERE "Recipient" ILIKE '%' || $1 || '%' ORDER BY "ID"`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	return errors
}

func GetTableData(searchText string) []Order {
	var data []Order
	stmt, ok := query["GetTableData"]
	if !ok {
		utils.Logger.Println("query не найден")
		return nil
	}

	rows, e := stmt.Query(searchText)
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}

	for rows.Next() {
		var row Order
		e = rows.Scan(&row.ID, &row.Recipient, &row.Date, &row.RequiredDate, &row.State, &row.StateID, &row.Zone)
		if e != nil {
			utils.Logger.Println(e)
			return nil
		}

		row.Date = row.Date[0:10]
		handlingDate := strings.Split(row.Date, "-")
		row.Date = handlingDate[2] + "." + handlingDate[1] + "." + handlingDate[0]
		row.RequiredDate = row.RequiredDate[0:10]
		handlingDate = strings.Split(row.RequiredDate, "-")
		row.RequiredDate = handlingDate[2] + "." + handlingDate[1] + "." + handlingDate[0]

		data = append(data, row)
	}

	return data
}

func (o *Order) AddOrder() bool {
	stmt, ok := query["AddOrder"]
	if !ok {
		utils.Logger.Println("query не найден")
		return false
	}

	_, e := stmt.Exec(o.Recipient, o.RequiredDate, 3, o.ZoneID)
	if e != nil {
		utils.Logger.Println(e)
		return false
	}

	return true
}

func GetZones() []Zone {
	var zones []Zone
	stmt, ok := query["GetZones"]
	if !ok {
		utils.Logger.Println("query не найден")
		return nil
	}

	rows, e := stmt.Query()
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}

	for rows.Next() {
		var zone Zone
		e = rows.Scan(&zone.ID, &zone.Name)
		if e != nil {
			utils.Logger.Println(e)
			return nil
		}

		zones = append(zones, zone)
	}

	return zones
}
