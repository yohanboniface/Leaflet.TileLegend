L.TileLegend = L.Class.extend({

    initialize: function (map, tilelayer, container, data) {
        this._map = map;
        this._tilelayer = tilelayer;
        this._data = data;
        this._container = container;
        L.DomUtil.addClass(this._container, 'leaflet-control-tilelegend');
    },

    open: function () {
        this.build();
    },

    build: function () {
        var headerElt = L.DomUtil.create('div', 'tilelegend-header', this._container),
            title = L.DomUtil.create('h1', '', headerElt);
        title.innerHTML = this._data.title;
        if (this._data.description) {
            var descr = L.DomUtil.create('p', '', headerElt);
            descr.innerHTML = this._data.description;
        }
        for (var idx in this._data.entries) {
            this.buildPara(this._data.entries[idx]);
        }
    },

    buildPara: function (para) {
        var paraElt = L.DomUtil.create('div', para.className || '', this._container),
            title = L.DomUtil.create('h4', '', paraElt),
            keysElt = L.DomUtil.create('ul', '', paraElt);
        title.innerHTML = para.title;
        for (var i = 0, l = para.keys.length; i < l; i++) {
            this.buildKey(para.keys[i], L.DomUtil.create('li', '', keysElt));
        }
    },

    buildKey: function (key, container) {
        var mapElt = L.DomUtil.create('div', 'tilelegend-map', container),
            zoomToElt = L.DomUtil.create('div', 'tilelegend-zoom-to', mapElt),
            latlng = [key.coordinates[0], key.coordinates[1]],
            zoom = key.coordinates[2],
            map = L.map(mapElt, {
                center: latlng,
                zoom: zoom,
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false
            });
        this._cloneLayer(this._tilelayer).addTo(map);
        map.on('click', function (e) {
            this._map.setView(latlng, zoom);
            L.DomEvent.stop(e);
        }, this);
        var txt = L.DomUtil.create('p', 'tilelegend-key', container);
        txt.innerHTML = key.text;
    },

    _cloneLayer: function (layer) {
        return new L.TileLayer(layer._url, layer.options);
    }

});