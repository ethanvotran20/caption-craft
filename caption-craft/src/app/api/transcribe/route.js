import {GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

function getClient() {
    return new TranscribeClient({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
}

function createTranscriptionCommand(filename) {
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: filename,
        OutputBucketName: process.env.BUCKET_NAME,
        OutputKey: filename + '.transcription',
        IdentifyLanguage: true,
        Media: {
            MediaFileUri: 's3://' + process.env.BUCKET_NAME + '/'+filename,
        },
    });
}

async function createTranscriptionJob(filename) {
    const transcribeClient = getClient();
    const transcriptionCommand = createTranscriptionCommand(filename);
    return await transcribeClient.send(transcriptionCommand);
}

async function getJob(filename) {
    const transcribeClient = getClient();
    let jobStatusResult = null;
    try {
        const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
            TranscriptionJobName: filename,
        });
        jobStatusResult = await transcribeClient.send(
            transcriptionJobStatusCommand
        );
    } catch (e) {}
    return jobStatusResult;
}

async function getTranscriptionFile(filename) {
    const transcriptionFile = filename + '.transcription';
    const s3client = new S3Client({
        region: 'us-east-2', 
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: transcriptionFile,
    });
    let transcriptionFileResponse = null;
    try {
        transcriptionFileResponse = await s3client.send(getObjectCommand);

    } catch (e) {}
    if (transcriptionFileResponse) {
        console.log(transcriptionFileResponse.Body);
    }
}

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');

    //find ready transcription
    await getTranscriptionFile(filename);

    //check if already transcribing
    const existingJob = await getJob(filename);

    if (existingJob) {
        return Response.json({
            status: existingJob.TranscriptionJob.TranscriptionJobStatus,
        })
    }

    //creating new transcription job
    if (!existingJob) {
       const newJob = await createTranscriptionJob(filename);
       return Response.json({
        status: newJob.TranscriptionJob.TranscriptionJobStatus,
       })
    }

    return Response.json(null);
}