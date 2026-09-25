import { zkWidget } from './zkWidget'

/** A synthetic 036 `index.zul` for B00000000 with the widgets the address flow touches. */
export const m036IndexHtml = (): string =>
  [
    "<script>zkdt({dt:'z_ab\\x2Dcd'});</script><p>B00000000 ACME SL</p>",
    zkWidget('c122', 'T1_MOD_DOMI_FISCAL_122'),
    zkWidget('lug', 'T1_LUGAR'),
    zkWidget('cal', 'T1_FIRMA_EN_CALIDAD'),
    zkWidget('fir', 'T1_FIRMADO'),
    "['zul.wgt.Button','bBus0',{label:'Buscar direcci\\xf3n'}],",
    "['zul.wgt.Button','bBus',{label:'Buscar direcci\\xf3n'}],",
    zkWidget('tv', 'IDEN_PJ_DOMI_FIS_TIPO_VIA_B11'),
    zkWidget('tn', 'IDEN_PJ_DOMI_FIS_TIPO_NUM_B13'),
    zkWidget('nc', 'IDEN_PJ_DOMI_FIS_NUM_CASA_B14'),
    zkWidget('co', 'IDEN_PJ_DOMI_FIS_COMPLEMENTO_B21'),
    zkWidget('ri', 'IDEN_PJ_INDI_REF_CATASTRAL_DOMI_FIS_B39'),
    zkWidget('rc', 'IDEN_PJ_DOMI_FIS_REF_CATASTRAL_B30'),
    zkWidget('tr', 'TITULARES_REALES_NO_VARIACION'),
    zkWidget('vp', 'ventanaPrincipal'),
    "['zul.wgt.Button','bVal',{label:'Validar declaraci\\xf3n'}],",
    "['zul.wgt.Button','bFirm',{label:'Firmar y Enviar'}],",
  ].join('')
