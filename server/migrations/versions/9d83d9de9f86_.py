"""empty message

Revision ID: 9d83d9de9f86
Revises: 37da0b51c7f3
Create Date: 2019-12-17 14:34:01.995237

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d83d9de9f86'
down_revision = '37da0b51c7f3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('attendings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['postings.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('attendings')
    # ### end Alembic commands ###
