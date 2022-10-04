#!/usr/bin/python

import log
import os
import os.path
import threading
import time
import simplejson as json
import yaml
from benedict import benedict
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import models

VERSION = "1.0.0"
NETPLAN = "/etc/netplan/01-network-manager-all.yaml"

logger = log.setup_custom_logger('root')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(f"tech-console REST started; version = {VERSION}")

@app.get("/tester")
async def tester():
    try:
        debug = False 
        ret_obj = {}
        ret_obj["res"]= "Success"

        if (debug):
            logger.info(f"ret_obj = {json.dumps(ret_obj)}")
        return ret_obj
    except Exception as e:
        logger.error(f"error = {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
@ app.get("/get_interfaces")
async def get_interfaces():
    try:
        debug = False
        ret_obj = {}

        # get network data
        with open(NETPLAN, "r") as stream:
            try:
                netplan_config = yaml.safe_load(stream)
                if (debug):
                    logger.debug("netplan_config = " +
                                 json.dumps(netplan_config))
                stream.close()
            except yaml.YAMLError as e:
                logger.error(f"error = {str(e)}")
                raise HTTPException(status_code=500, detail=str(e))
        network = netplan_config.get("network")
        if (debug):
            logger.debug("network = " + json.dumps(network))

        # Bridge 0
        br0_addresses = ""
        br0_gateway = ""
        br0_nameservers = ""

        bridges = network.get("bridges", "")
        if bridges:
            if (debug):
                logger.debug("bridges = " + json.dumps(bridges))
            br0 = bridges.get("br0", "")
            if br0:
                br0_addresses = br0.get("addresses", "")
                routes = br0.get("routes", "")
                nameservers = br0.get("nameservers", "")
                if routes:
                    br0_gateway = routes[0].get("via", "")
                if nameservers:
                    br0_nameservers = nameservers.get("addresses", "")

        # Ethernet Ports
        eth0_addresses = ""
        eth0_gateway = ""
        eth0_nameservers = ""
        eth1_addresses = ""
        eth1_gateway = ""
        eth1_nameservers = ""

        ethernets = network.get("ethernets", "")
        if ethernets:
            if (debug):
                logger.debug("ethernets = " + json.dumps(ethernets))
            eth0 = ethernets.get("eth0", "")  # LAN1
            if eth0:
                eth0_addresses = eth0.get("addresses", "")
                routes = eth0.get("routes", "")
                nameservers = eth0.get("nameservers", "")
                if routes:
                    eth0_gateway = routes[0].get("via", "")
                if nameservers:
                    eth0_nameservers = nameservers.get("addresses", "")
            eth1 = ethernets.get("eth1", "")  # LAN2
            if eth1:
                eth1_addresses = eth1.get("addresses", "")
                routes = eth1.get("routes", "")
                nameservers = eth1.get("nameservers", "")
                if routes:
                    eth1_gateway = routes[0].get("via", "")
                if nameservers:
                    eth1_nameservers = nameservers.get("addresses", "")

        # Wi-Fi
        wifi_addresses = ""
        wifi_gateway = ""
        wifi_nameservers = ""
        wifi_ssid = ""
        wifi_ssid_password = ""

        wifis = network.get("wifis", "")
        if wifis:
            if (debug):
                logger.debug("wifis = " + json.dumps(wifis))
            wifi = wifis.get("wlan0", "")
            if wifi:
                wifi_addresses = wifi.get("addresses", "")
                routes = wifi.get("routes", "")
                nameservers = wifi.get("nameservers", "")
                if routes:
                    wifi_gateway = routes[0].get("via", "")
                if nameservers:
                    wifi_nameservers = nameservers.get("addresses", "")
                wifi_access_points = wifi.get("access-points", "")
                for key in wifi_access_points.keys():
                    wifi_ssid = key
                wifi_ssid_password = wifi_access_points[wifi_ssid].get(
                    "password", "")

        # add to response
        ret_obj["br0_addresses"] = br0_addresses
        ret_obj["br0_gateway"] = br0_gateway
        ret_obj["br0_nameservers"] = br0_nameservers

        ret_obj["eth0_addresses"] = eth0_addresses
        ret_obj["eth0_gateway"] = eth0_gateway
        ret_obj["eth0_nameservers"] = eth0_nameservers

        ret_obj["eth1_addresses"] = eth1_addresses
        ret_obj["eth1_gateway"] = eth1_gateway
        ret_obj["eth1_nameservers"] = eth1_nameservers

        ret_obj["wifi_addresses"] = wifi_addresses
        ret_obj["wifi_gateway"] = wifi_gateway
        ret_obj["wifi_nameservers"] = wifi_nameservers
        ret_obj["wifi_ssid"] = wifi_ssid
        ret_obj["wifi_ssid_password"] = wifi_ssid_password

        # return data
        # converts json object to string
        if (debug):
            logger.info(f"ret_obj = {json.dumps(ret_obj)}")
        return ret_obj
    except Exception as e:
        logger.error(f"error = {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
