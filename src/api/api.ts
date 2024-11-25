import { collection, getDocs, getDoc, query, orderBy, limit, where, doc } from "firebase/firestore"
import { db } from "./api-firebase.ts"

export const getTournament = async(id: string) => {
  const ref = doc(db, "tournaments", id)
  const tournament = await getDoc(ref)
  let tournamentData = tournament.data()
  return tournamentData
}

export const getPlayer = async(slug: string) => {
  const ref = doc(db, "players", slug)
  const player = await getDoc(ref)
  let playerData = player.data()
  return playerData
}

export const getAllTournaments = async(options?: {orderByDate?: boolean}) => {

  const q =
    (options?.orderByDate) ?
      query(collection(db, "tournaments"), orderBy("dateStart", "desc"))
      :
      query(collection(db, "tournaments"))

  const res = await getDocs(q)

  const tournaments = res.docs.map((doc) => {
    const tournamentData = {
      id: doc.id,
      data: doc.data()
    }
    return tournamentData
  })

  return tournaments
}
