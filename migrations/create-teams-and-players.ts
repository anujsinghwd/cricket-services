import { connect, connection } from 'mongoose';
import { TeamSchema } from '../src/infrastructure/database/mongoose/schemas/team.schema';
import { PlayerSchema } from '../src/infrastructure/database/mongoose/schemas/player.schema';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigration() {
  await connect(`${process.env.MONGO_URI}/${process.env.DATABASE}`); // Replace with your MongoDB URI

  const TeamModel = connection.model('Team', TeamSchema);
  const PlayerModel = connection.model('Player', PlayerSchema);

  // Read data from JSON file
  const filePath = path.join(__dirname, 'teams-and-players.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const teamsData: { name: string; players: any[] }[] = JSON.parse(jsonData);

  // Insert teams into the database
  for (const teamData of teamsData['teams']) {
    const createdTeam = await TeamModel.create({
      name: teamData.name,
      players: [],
    });

    // Insert players and associate them with the team
    for (const playerData of teamData.players) {
      const createdPlayer = await PlayerModel.create({
        name: playerData.name,
        role: playerData.role,
        battingStyle: playerData.battingStyle,
        bowlingStyle: playerData.bowlingStyle,
        team: createdTeam._id,
      });

      await TeamModel.updateOne(
        { _id: createdTeam._id },
        { $push: { players: createdPlayer._id } },
      );
    }
  }

  console.log('Migration completed');
  process.exit();
}

runMigration().catch((err) => {
  console.error(err);
  process.exit(1);
});
