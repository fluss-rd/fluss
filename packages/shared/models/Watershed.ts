import Location from "./Location";
import { Waterbody as WaterbodyResponse } from "../services/watersheds/models";
import WatershedType from "./WatershedType";
import Wqi from "./Wqi";

type Watershed = {
  id: string;
  name: string;
  type: WatershedType;
  location: Location;
  creationDate: Date;
  updateDate: Date;
  modulesQuantity: number;
  wqi: Wqi; // Water Quality Index.
  area: Array<Location>;
};

export function fromWaterbodyResponse(waterbodyResponse: WaterbodyResponse): Watershed {
  return {
    updateDate: new Date(waterbodyResponse.updateDate),
    creationDate: new Date(waterbodyResponse.creationDate),
    location: { longitude: 0, latitude: 0 },
    name: waterbodyResponse.name,
    id: waterbodyResponse.riverID,
    wqi: { value: 80, rating: "excellent" }, // TODO: replace with the waterbody wqi
    area: waterbodyResponse.location,
    modulesQuantity: 3, // TODO: replace with the modules quantity.
    type: waterbodyResponse.type as WatershedType,
  };
}

export function mockWatersheds(): Watershed[] {
  return [
    {
      id: "WS-1",
      name: "Río Yaque del Norte",
      location: { latitude: 19.8401, longitude: -71.687 },
      modulesQuantity: 2,
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      wqi: { value: 250, rating: "moderate" },
      type: "river",
      area: [
        {
          longitude: -71.36337004740639,
          latitude: 17.80170240857656,
        },
        {
          longitude: -71.3635835925454,
          latitude: 17.79804259910267,
        },
        {
          longitude: -71.3646513182395,
          latitude: 17.79478937211997,
        },
        {
          longitude: -71.36785449532226,
          latitude: 17.792959405887817,
        },
        {
          longitude: -71.37084412726603,
          latitude: 17.7907227550195,
        },
        {
          longitude: -71.37084412726603,
          latitude: 17.78929941715153,
        },
        {
          longitude: -71.37340666893226,
          latitude: 17.78563935339818,
        },
        {
          longitude: -71.37319312379323,
          latitude: 17.782995927374987,
        },
        {
          longitude: -71.37532857518144,
          latitude: 17.782182557651783,
        },
        {
          longitude: -71.37660984601455,
          latitude: 17.780352462233655,
        },
        {
          longitude: -71.37746402657012,
          latitude: 17.777098912983707,
        },
        {
          longitude: -71.37874529740324,
          latitude: 17.773641951998968,
        },
        {
          longitude: -71.38066720365241,
          latitude: 17.772015123693,
        },
        {
          longitude: -71.37959947795831,
          latitude: 17.76611774698121,
        },
        {
          longitude: -71.37959947795831,
          latitude: 17.761847111388345,
        },
        {
          longitude: -71.381734929347,
          latitude: 17.758999964342856,
        },
        {
          longitude: -71.381734929347,
          latitude: 17.755746026519148,
        },
        {
          longitude: -71.38429747101273,
          latitude: 17.751068387226834,
        },
        {
          longitude: -71.38322974531864,
          latitude: 17.74517031995869,
        },
        {
          longitude: -71.38088074879144,
          latitude: 17.74293307119865,
        },
        {
          longitude: -71.3804536585139,
          latitude: 17.740695794486495,
        },
        {
          longitude: -71.38344329045766,
          latitude: 17.739272058389922,
        },
        {
          longitude: -71.38536519670733,
          latitude: 17.735407574796277,
        },
        {
          longitude: -71.38515165156832,
          latitude: 17.732153208161865,
        },
        {
          longitude: -71.38557874184586,
          latitude: 17.72889878242099,
        },
        {
          longitude: -71.38621937726242,
          latitude: 17.724830667139912,
        },
        {
          longitude: -71.38686001267897,
          latitude: 17.720965872108618,
        },
        {
          longitude: -71.38707355781798,
          latitude: 17.71750782699374,
        },
        {
          longitude: -71.38472456129077,
          latitude: 17.71323603214813,
        },
        {
          longitude: -71.38301620018012,
          latitude: 17.709574412741254,
        },
        {
          longitude: -71.38002656823635,
          latitude: 17.708150429458293,
        },
        {
          longitude: -71.37554212032045,
          latitude: 17.70998126303273,
        },
        {
          longitude: -71.3736202140708,
          latitude: 17.712422345405315,
        },
        {
          longitude: -71.37404730434882,
          latitude: 17.71445655534256,
        },
        {
          longitude: -71.37340666893226,
          latitude: 17.716694159629164,
        },
        {
          longitude: -71.37084412726603,
          latitude: 17.719338565067694,
        },
        {
          longitude: -71.37063058212702,
          latitude: 17.716083906683497,
        },
        {
          longitude: -71.37105767240506,
          latitude: 17.713846294783817,
        },
        {
          longitude: -71.36934931129392,
          latitude: 17.713642874135957,
        },
        {
          longitude: -71.36934931129392,
          latitude: 17.7114052317866,
        },
        {
          longitude: -71.36635967935015,
          latitude: 17.712218923142725,
        },
        {
          longitude: -71.36401068282295,
          latitude: 17.713846294783817,
        },
        {
          longitude: -71.36401068282295,
          latitude: 17.71588048857317,
        },
        {
          longitude: -71.36166168629573,
          latitude: 17.71791465929213,
        },
        {
          longitude: -71.36379713768439,
          latitude: 17.720965872108618,
        },
        {
          longitude: -71.36550549879507,
          latitude: 17.719338565067694,
        },
        {
          longitude: -71.3661461342116,
          latitude: 17.72137269656174,
        },
        {
          longitude: -71.36507840851749,
          latitude: 17.724423850533476,
        },
        {
          longitude: -71.3625158668513,
          latitude: 17.72666133044221,
        },
        {
          longitude: -71.3614481411572,
          latitude: 17.729305588871053,
        },
        {
          longitude: -71.36059396060162,
          latitude: 17.736017761958607,
        },
        {
          longitude: -71.3601668703241,
          latitude: 17.740695794486495,
        },
        {
          longitude: -71.35696369324131,
          latitude: 17.74557708945746,
        },
        {
          longitude: -71.35525533213065,
          latitude: 17.74822106866958,
        },
        {
          longitude: -71.35525533213065,
          latitude: 17.752288652742646,
        },
        {
          longitude: -71.35546887726967,
          latitude: 17.756559516522966,
        },
        {
          longitude: -71.35376051615852,
          latitude: 17.761643745245816,
        },
        {
          longitude: -71.35077088421477,
          latitude: 17.76510093823324,
        },
        {
          longitude: -71.34863543282654,
          latitude: 17.76632110803625,
        },
        {
          longitude: -71.34735416199347,
          latitude: 17.76855806438543,
        },
        {
          longitude: -71.34991670365966,
          latitude: 17.769981567490788,
        },
        {
          longitude: -71.35098442935374,
          latitude: 17.77343859927039,
        },
        {
          longitude: -71.35141151963133,
          latitude: 17.776692215161763,
        },
        {
          longitude: -71.34970315852065,
          latitude: 17.778522348070386,
        },
        {
          longitude: -71.34628643629932,
          latitude: 17.781572527928446,
        },
        {
          longitude: -71.34415098491117,
          latitude: 17.784419315479823,
        },
        {
          longitude: -71.3415884432449,
          latitude: 17.78665604529897,
        },
        {
          longitude: -71.33753108560704,
          latitude: 17.790926088074556,
        },
        {
          longitude: -71.33710399532904,
          latitude: 17.7970259720395,
        },
        {
          longitude: -71.33731754046806,
          latitude: 17.79987251322157,
        },
        {
          longitude: -71.34030717241183,
          latitude: 17.801295766786513,
        },
        {
          longitude: -71.34543225574379,
          latitude: 17.80170240857656,
        },
        {
          longitude: -71.35205215504786,
          latitude: 17.80251568937834,
        },
        {
          longitude: -71.35952623490753,
          latitude: 17.803125647546114,
        },
        {
          longitude: -71.36337004740639,
          latitude: 17.80170240857656,
        },
      ],
    },
    {
      id: "WS-2",
      name: "Laguna Oviedo",
      location: { latitude: 17.75, longitude: -71.3666667 },
      modulesQuantity: 3,
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      wqi: { value: 250, rating: "moderate" },
      type: "lake",
      area: [
        {
          longitude: -71.67639561904144,
          latitude: 19.83027356698388,
        },
        {
          longitude: -71.67597817115157,
          latitude: 19.829898722340918,
        },
        {
          longitude: -71.6755607232614,
          latitude: 19.82957742623077,
        },
        {
          longitude: -71.67535199931652,
          latitude: 19.829220429791505,
        },
        {
          longitude: -71.67523814989177,
          latitude: 19.828542134345536,
        },
        {
          longitude: -71.67525712479596,
          latitude: 19.827756736001607,
        },
        {
          longitude: -71.67540892402869,
          latitude: 19.827346185322654,
        },
        {
          longitude: -71.6757314973983,
          latitude: 19.826917783483182,
        },
        {
          longitude: -71.67645254375387,
          latitude: 19.827007033961326,
        },
        {
          longitude: -71.67850183339586,
          latitude: 19.82795308595174,
        },
        {
          longitude: -71.67945057860099,
          latitude: 19.827828136011867,
        },
        {
          longitude: -71.68013367514813,
          latitude: 19.826578631207557,
        },
        {
          longitude: -71.68017162495654,
          latitude: 19.82552546952823,
        },
        {
          longitude: -71.67984905158694,
          latitude: 19.824561552721253,
        },
        {
          longitude: -71.67946955350472,
          latitude: 19.824115292960624,
        },
        {
          longitude: -71.6788623565739,
          latitude: 19.823615480541733,
        },
        {
          longitude: -71.67804643569777,
          latitude: 19.82325847070802,
        },
        {
          longitude: -71.6764904935618,
          latitude: 19.823276321218838,
        },
        {
          longitude: -71.67520020008335,
          latitude: 19.82386538694765,
        },
        {
          longitude: -71.6738150320848,
          latitude: 19.824900709301566,
        },
        {
          longitude: -71.67261961312644,
          latitude: 19.825846773831383,
        },
        {
          longitude: -71.67058929838865,
          latitude: 19.82686423317171,
        },
        {
          longitude: -71.66882463230787,
          latitude: 19.827738885994002,
        },
        {
          longitude: -71.66762921334949,
          latitude: 19.82818513557927,
        },
        {
          longitude: -71.66535222485845,
          latitude: 19.828310085239334,
        },
        {
          longitude: -71.66540914957059,
          latitude: 19.82866708372395,
        },
        {
          longitude: -71.66770511296583,
          latitude: 19.82863138391133,
        },
        {
          longitude: -71.66886258211582,
          latitude: 19.828256535397056,
        },
        {
          longitude: -71.67292321159233,
          latitude: 19.826168077484905,
        },
        {
          longitude: -71.67540892402869,
          latitude: 19.824347348193044,
        },
        {
          longitude: -71.67666126769873,
          latitude: 19.82386538694765,
        },
        {
          longitude: -71.67764796271177,
          latitude: 19.823793985156964,
        },
        {
          longitude: -71.67882440676549,
          latitude: 19.824258096220333,
        },
        {
          longitude: -71.67954545312105,
          latitude: 19.825382667407336,
        },
        {
          longitude: -71.67954545312105,
          latitude: 19.82645368018692,
        },
        {
          longitude: -71.6790331307108,
          latitude: 19.827185534768084,
        },
        {
          longitude: -71.67833105925942,
          latitude: 19.827453285601845,
        },
        {
          longitude: -71.67681306693143,
          latitude: 19.82663218161526,
        },
        {
          longitude: -71.67641459394547,
          latitude: 19.82643583003298,
        },
        {
          longitude: -71.67561764797352,
          latitude: 19.826471530338885,
        },
        {
          longitude: -71.67480172709739,
          latitude: 19.826953483680818,
        },
        {
          longitude: -71.67461197805676,
          latitude: 19.828024485872866,
        },
        {
          longitude: -71.67457402824834,
          latitude: 19.828595684091567,
        },
        {
          longitude: -71.67510532556327,
          latitude: 19.82975592415007,
        },
        {
          longitude: -71.67611099548004,
          latitude: 19.83068411009715,
        },
        {
          longitude: -71.67639561904144,
          latitude: 19.83027356698388,
        },
      ],
    },
  ];
}

export default Watershed;

