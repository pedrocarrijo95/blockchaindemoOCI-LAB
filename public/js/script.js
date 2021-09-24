import {
    variables
} from './globalvars.js'

var url = variables.url;
var channel = variables.channel;
var chaincodename = variables.chaincodename;
var chaincodeVer = variables.chaincodeVer;



window.cadastrarSacas = function cadastrarSacas() {
    var textStatus = document.getElementById("textStatus1");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "sua auth");
    myHeaders.append("Content-Type", "application/json");


    var edtEtiquetaFamilia = (document.getElementById('edtEtiquetaFamilia').value).toString();
    var edtFamilia = (document.getElementById('edtFamilia').value).toString();
    var edtPesoSaca = (document.getElementById('edtPesoSaca').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto').value).toString();
    var edtCodigoCooperativa = (document.getElementById('edtCodigoCooperativa').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addSacas",
        "args": [edtEtiquetaFamilia, edtFamilia, datetimenow, edtPesoSaca, edtTipoProduto, edtCodigoCooperativa]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo1').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

window.cadastrarProcessar = function cadastrarProcessar() {
    var textStatus = document.getElementById("textStatus2");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "sua auth");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLote = (document.getElementById('edtCodigoLote').value).toString();
    var edtEtiquetaCooperativa = (document.getElementById('edtEtiquetaCooperativa').value).toString();
    var edtQuantidadeSacas = (document.getElementById('edtQuantidadeSacas').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto').value).toString();
    var edtListaEtiquetasFamilia = (document.getElementById('edtListaEtiquetasFamilia').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addProcessar",
        "args": [edtCodigoLote, datetimenow, edtEtiquetaCooperativa, edtQuantidadeSacas, edtTipoProduto, edtListaEtiquetasFamilia]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo2').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

window.cadastrarProcessado = async function cadastrarProcessado() {

    var textStatus = document.getElementById("textStatus3");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "sua auth");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLoteProcessado = (document.getElementById('edtCodigoLoteProcessado').value).toString();
    var edtQuantidade = (document.getElementById('edtQuantidade3').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto3').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        var raw = JSON.stringify({
            "channel": channel,
            "chaincode": chaincodename,
            "chaincodeVer": chaincodeVer,
            "method": "addProcessado",
            "args": [edtCodigoLoteProcessado, datetimenow, edtQuantidade, edtTipoProduto]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        async function myFetchAsync() {
            let response = await fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions);
            //var resp = JSON.parse(response.toString());
            var resp = await response.json();
            //console.log(JSON.stringify(resp));
            if (resp.returnCode == "Success") {
                var myHeadersOIC = new Headers();
                myHeadersOIC.append("Authorization", "sua auth");
                myHeadersOIC.append("Content-Type", "application/json");
                
                        
                var rawOIC = JSON.stringify({"CodigoLoteProcessado":edtCodigoLoteProcessado,"DataRegistro":datetimenow,"Quantidade":edtQuantidade,"TipoProduto":edtTipoProduto});
        
                var requestOptionsOIC = {
                method: 'POST',
                headers: myHeadersOIC,
                body: rawOIC,
                redirect: 'follow'
                };
        
                fetch("https://oic-idvkxij5qkne-gr.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/INTEGRACAOPOCNAT_2/1.0/", requestOptionsOIC)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

                document.getElementById('btnproximo3').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            }
            else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }
            
          }

          myFetchAsync()
            .catch(e => {
            console.log('ocorreu algum problema: ' + e.message);
            });
       

}

window.cadastrarIndustriaX = function cadastrarIndustriaX() {
    var textStatus = document.getElementById("textStatus4");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "sua auth");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLoteIndustriaX = (document.getElementById('edtCodigoLoteIndustriaX').value).toString();
    var edtQuantidade = (document.getElementById('edtQuantidadeIndustriaX').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProdutoIndustriaX').value).toString();
    var edtCodigoLoteProcessamento = (document.getElementById('edtCodigoLoteProcessamento').value).toString()

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addIndustriaX",
        "args": [edtCodigoLoteIndustriaX, datetimenow, edtQuantidade, edtTipoProduto, edtCodigoLoteProcessamento]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo4').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

var myHeaders = new Headers();
myHeaders.append("Authorization", "sua auth");
myHeaders.append("Content-Type", "application/json");


var myHeadersBlockchainTable = new Headers();
myHeadersBlockchainTable.append("Content-Type", "application/json");


function esperar(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getFamiliasQR(listaEtiquetasFamiliaArr, i) {
    //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"EtiquetaFamilia\":\"" + listaEtiquetasFamiliaArr[i] + "\"}}"]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + JSON.stringify(objrs));

            for (var i = (objrs.length - 1); i >= 0; i--) {
                var EtiquetaFamilia = objrs[i].Record.EtiquetaFamilia;
                var Familia = objrs[i].Record.Familia;
                var DataRegistro = objrs[i].Record.DataRegistro;
                var PesoSaca = objrs[i].Record.PesoSaca;
                var TipoProduto = objrs[i].Record.TipoProduto;
                var CodigoCooperativa = objrs[i].Record.CodigoCooperativa;


                var listaetapa1 = document.getElementById("listaetapa1");

                var localchildlist = document.createElement('ul');
                var imgitem = document.createElement('img');
                var localitem1 = document.createElement('li');
                var localitem2 = document.createElement('li');
                var localitem3 = document.createElement('li');
                var localitem4 = document.createElement('li');
                var localitem5 = document.createElement('li');
                var localitem6 = document.createElement('li');

                imgitem.src = "http://www.r13a.com/familia-s-" + Familia + ".jpg";
                imgitem.style.width = "50%";
                imgitem.style.height = "automatic";

                localitem1.innerHTML = "Familia: " + Familia;
                localitem2.innerHTML = "Etiqueta Familia: " + EtiquetaFamilia;
                localitem3.innerHTML = "Data Registro: " + DataRegistro;
                localitem4.innerHTML = "Peso Saca: " + PesoSaca;
                localitem5.innerHTML = "Tipo Produto: " + TipoProduto;
                localitem6.innerHTML = "CodigoCooperativa: " + CodigoCooperativa;

                var breakline = document.createElement('br');

                localchildlist.appendChild(imgitem);
                localchildlist.appendChild(localitem1);
                localchildlist.appendChild(localitem2);
                localchildlist.appendChild(localitem3);
                localchildlist.appendChild(localitem4);
                localchildlist.appendChild(localitem5);
                localchildlist.appendChild(localitem6);

                listaetapa1.appendChild(breakline);
                listaetapa1.appendChild(localchildlist);


            }

        })
        .catch(error => console.log('error', error));
}


window.buscarQR = async function buscarQR(loteIndustriaX) {

    var codigoloteIndustriaX = loteIndustriaX;
    console.log(codigoloteIndustriaX);

    //BUSCAR PELO CODIGO LOTE IndustriaX
    var raw = "";
    raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"CodigoLoteIndustriaX\":\"" + codigoloteIndustriaX + "\"}}"]
    });

    //"args": ["{\"selector\":{\"Teste\":\"" + teste + "\",\"Destino\":\"" + dest + "\"}}"]


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    //RESETAR UL Lists
    document.getElementById("listaetapa1").innerHTML = '';
    document.getElementById("listaetapa2").innerHTML = '';
    document.getElementById("listaetapa3").innerHTML = '';
    document.getElementById("listaetapa4").innerHTML = '';


    var textStatus = document.getElementById("textStatus5");
    textStatus.innerHTML = "Buscando..";
    textStatus.style.color = "#FFFF00";

    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + JSON.stringify(objrs[0].Record));
            var j = 0;
            //for (var i = (objrs.length-1); i >= (objrs.length-2) ; i--) {
            var CodigoLoteIndustriaX = objrs[j].Record.CodigoLoteIndustriaX;
            var DataRegistro = objrs[j].Record.DataRegistro;
            var Quantidade = objrs[j].Record.Quantidade;
            var TipoProduto = objrs[j].Record.TipoProduto;
            var CodigoLoteProcessamento = objrs[j].Record.CodigoLoteProcessamento;
            console.log("proc: " + CodigoLoteProcessamento);
            var listaetapa4 = document.getElementById("listaetapa4");

            var childlist = document.createElement('ul');
            var item1 = document.createElement('li');
            var item2 = document.createElement('li');
            var item3 = document.createElement('li');
            var item4 = document.createElement('li');
            var item5 = document.createElement('li');

            item1.innerHTML = "Codigo Lote - IndustriaX: " + CodigoLoteIndustriaX;
            item2.innerHTML = "Data Registro: " + DataRegistro;
            item3.innerHTML = "Quantidade: " + Quantidade;
            item4.innerHTML = "Tipo Produto: " + TipoProduto;
            item5.innerHTML = "Codigo Lote - Processamento: " + CodigoLoteProcessamento;
            childlist.appendChild(item1);
            childlist.appendChild(item2);
            childlist.appendChild(item3);
            childlist.appendChild(item4);
            childlist.appendChild(item5);

            listaetapa4.appendChild(childlist);


            //BUSCAR PELO CODIGO LOTE PROCESSAMENTO - LotesIndustriaX
            var raw = JSON.stringify({
                "channel": channel,
                "chaincode": chaincodename,
                "chaincodeVer": chaincodeVer,
                "method": "queryEvent",
                "args": ["{\"selector\":{\"CodigoLoteProcessado\":\"" + CodigoLoteProcessamento + "\"}}"]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var rs = JSON.parse(result.toString());
                    var objrs = rs.result.payload;
                    console.log("objrs: " + objrs);
                    var j = 0;
                    //for (var i = (objrs.length-1); i >= 0 ; i--) {
                    var CodigoLoteProcessado = objrs[j].Record.CodigoLoteProcessado;
                    var DataRegistro = objrs[j].Record.DataRegistro;
                    var Quantidade = objrs[j].Record.Quantidade;
                    var TipoProduto = objrs[j].Record.TipoProduto;

                    var listaetapa3 = document.getElementById("listaetapa3");

                    var childlist = document.createElement('ul');
                    var item1 = document.createElement('li');
                    var item2 = document.createElement('li');
                    var item3 = document.createElement('li');
                    var item4 = document.createElement('li');

                    item1.innerHTML = "Codigo Lote - Processado: " + CodigoLoteProcessado;
                    item2.innerHTML = "Data Registro: " + DataRegistro;
                    item3.innerHTML = "Quantidade: " + Quantidade;
                    item4.innerHTML = "Tipo Produto: " + TipoProduto;
                    childlist.appendChild(item1);
                    childlist.appendChild(item2);
                    childlist.appendChild(item3);
                    childlist.appendChild(item4);

                    listaetapa3.appendChild(childlist);


                    //BUSCAR PELO CODIGO LOTE DAS COOPERATIVAS
                    var raw = JSON.stringify({
                        "channel": channel,
                        "chaincode": chaincodename,
                        "chaincodeVer": chaincodeVer,
                        "method": "queryEvent",
                        "args": ["{\"selector\":{\"CodigoLote\":\"" + CodigoLoteProcessado + "\"}}"]
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            var rs = JSON.parse(result.toString());
                            var objrs = rs.result.payload;
                            console.log("objrs: " + JSON.stringify(objrs));

                            for (var i = (objrs.length - 1); i == 0; i--) {
                                var CodigoLote = objrs[i].Record.CodigoLote;
                                var DataRegistro = objrs[i].Record.DataRegistro;
                                var EtiquetaCooperativa = objrs[i].Record.EtiquetaCooperativa;
                                var QuantidadeSacas = objrs[i].Record.QuantidadeSacas;
                                var TipoProduto = objrs[i].Record.TipoProduto;
                                var ListaEtiquetasFamilia = objrs[i].Record.ListaEtiquetasFamilia;
                                var listaetapa2 = document.getElementById("listaetapa2");

                                var childlist = document.createElement('ul');
                                var item1 = document.createElement('li');
                                var item2 = document.createElement('li');
                                var item3 = document.createElement('li');
                                var item4 = document.createElement('li');
                                var item5 = document.createElement('li');
                                var item6 = document.createElement('li');

                                var breakline = document.createElement('br');
                                //console.log("1");

                                item1.innerHTML = "Codigo Lote: " + CodigoLote;
                                item2.innerHTML = "Data Registro: " + DataRegistro;
                                item3.innerHTML = "Etiqueta Cooperativa: " + EtiquetaCooperativa;
                                item4.innerHTML = "Quantidade Sacas: " + QuantidadeSacas;
                                item5.innerHTML = "Tipo Produto: " + TipoProduto;
                                item6.innerHTML = "Lista Etiquetas Familia: " + ListaEtiquetasFamilia;
                                childlist.appendChild(item1);
                                childlist.appendChild(item2);
                                childlist.appendChild(item3);
                                childlist.appendChild(item4);
                                childlist.appendChild(item5);
                                childlist.appendChild(item6);

                                listaetapa2.appendChild(breakline);
                                listaetapa2.appendChild(childlist);



                                //console.log("2");
                                var listaEtiquetasFamiliaArr = [];
                                if (ListaEtiquetasFamilia.indexOf(',') != -1) {
                                    listaEtiquetasFamiliaArr = ListaEtiquetasFamilia.split(',');
                                } else {
                                    listaEtiquetasFamiliaArr[0] = ListaEtiquetasFamilia;
                                }
                                if (listaEtiquetasFamiliaArr.length > 1) {
                                    for (var i = 0; i < listaEtiquetasFamiliaArr.length; i++) {
                                        //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
                                        getFamiliasQR(listaEtiquetasFamiliaArr, i);

                                    }
                                } else {
                                    getFamiliasQR(listaEtiquetasFamiliaArr, 0);
                                }

                            }


                        }).catch(error => console.log('error', error));

                    //}

                }).catch(error => console.log('error', error));

            textStatus.innerHTML = "Sucesso.";
            textStatus.style.color = "#9ACD32"

        }).catch(error => console.log('error', error));



}